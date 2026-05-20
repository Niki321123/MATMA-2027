// DiagramRenderer — generuje diagramy SVG dla zadań geometrycznych
// Obsługiwane typy: circle_tangent, line_equation, point_line_distance,
//                   circle_equation, triangular_prism, regular_pyramid, cuboid
window.DiagramRenderer = (() => {
  'use strict';

  // ── Paleta (dark theme) ─────────────────────────────────────────
  const C = {
    bg:      '#161929',
    border:  '#232745',
    grid:    '#1c2035',
    axis:    '#3a4060',
    tick:    '#4a546e',
    tickLbl: '#5a6480',
    line:    '#5b8dee',   // główna prosta / odcinek
    circle:  '#4caf7d',   // okrąg
    tangent: '#f5c842',   // styczna
    perpDot: '#f5c842',   // kreska odległości
    pBlue:   '#5b8dee',   // punkt zwykły
    pRed:    '#f25f5f',   // punkt P (specjalny)
    pGreen:  '#4caf7d',   // środek okręgu
    seg:     '#8d9bc0',   // odcinek pomocniczy
    label:   '#e8ecf8',
    muted:   '#8d9bc0',
  };
  const FONT = "Inter, system-ui, sans-serif";
  const r2 = n => Math.round(n * 100) / 100;

  // ════════════════════════════════════════════════════════════════
  //  UKŁAD WSPÓŁRZĘDNYCH — wspólny engine
  // ════════════════════════════════════════════════════════════════

  const W = 320, H = 290;
  const PAD = { t: 22, r: 28, b: 32, l: 36 };

  /** Liang-Barsky: przytnie nieskończoną prostą do prostokąta [x0..x1]×[y0..y1].
   *  Parametryzacja: P(t) = (px + t·dx, py + t·dy), t ∈ ℝ.
   *  Zwraca [ax,ay, bx,by] lub null jeśli linia nie przecina prostokąta. */
  function clipLine(px, py, dx, dy, x0, x1, y0, y1) {
    // Obsługa linii pionowej i poziomej
    if (Math.abs(dx) < 1e-10 && Math.abs(dy) < 1e-10) return null;
    if (Math.abs(dx) < 1e-10) {
      if (px < x0 || px > x1) return null;
      return [px, y0, px, y1];
    }
    if (Math.abs(dy) < 1e-10) {
      if (py < y0 || py > y1) return null;
      return [x0, py, x1, py];
    }

    const P = [-dx, dx, -dy, dy];
    const Q = [px - x0, x1 - px, py - y0, y1 - py];
    let tEnter = -1e9, tLeave = 1e9;

    for (let i = 0; i < 4; i++) {
      const t = Q[i] / P[i];
      if (P[i] === 0) { if (Q[i] < 0) return null; continue; }
      if (P[i] < 0) { if (t > tEnter) tEnter = t; }
      else          { if (t < tLeave) tLeave = t; }
    }
    if (tEnter > tLeave + 1e-9) return null;
    return [px + tEnter*dx, py + tEnter*dy, px + tLeave*dx, py + tLeave*dy];
  }

  /** Rzut prostopadły punktu (px,py) na prostą przez (lx1,ly1)-(lx2,ly2). */
  function footOfPerp(px, py, lx1, ly1, lx2, ly2) {
    const dx = lx2 - lx1, dy = ly2 - ly1;
    const t = ((px - lx1)*dx + (py - ly1)*dy) / (dx*dx + dy*dy);
    return [lx1 + t*dx, ly1 + t*dy];
  }

  /** Wybierz krok siatki tak, żeby linii było 6–12. */
  function gridStep(span) {
    if (span <= 7)  return 1;
    if (span <= 14) return 2;
    if (span <= 35) return 5;
    return 10;
  }

  /**
   * Buduje SVG z układem współrzędnych.
   * objects: tablica deskryptorów:
   *   { type:'circle', cx, cy, r, color? }
   *   { type:'line',   x1, y1, x2, y2, color?, dash? }
   *   { type:'segment',x1, y1, x2, y2, color?, dash? }
   *   { type:'distSeg',px, py, fx, fy, lx1,ly1,lx2,ly2 }   ← od P do stopy + kąt prosty
   *   { type:'point',  x, y, color?, label?, lx?, ly? }     ← lx/ly = przesunięcie etykiety
   */
  function buildCoord(objects) {
    // ── wyznacz granice ──────────────────────────────────────────
    const xs = [0], ys = [0];
    objects.forEach(o => {
      if ('x'  in o && 'y'  in o) { xs.push(o.x);  ys.push(o.y); }
      if ('x1' in o) { xs.push(o.x1, o.x2); ys.push(o.y1, o.y2); }
      if ('px' in o) { xs.push(o.px, o.fx); ys.push(o.py, o.fy); }
      if ('cx' in o) {
        xs.push(o.cx - o.r, o.cx + o.r);
        ys.push(o.cy - o.r, o.cy + o.r);
      }
    });

    let xMin = Math.min(...xs), xMax = Math.max(...xs);
    let yMin = Math.min(...ys), yMax = Math.max(...ys);

    // margines 28%
    const xSpan = Math.max(xMax - xMin, 5);
    const ySpan = Math.max(yMax - yMin, 5);
    xMin = Math.floor(xMin - xSpan * 0.28);
    xMax = Math.ceil(xMax  + xSpan * 0.28);
    yMin = Math.floor(yMin - ySpan * 0.28);
    yMax = Math.ceil(yMax  + ySpan * 0.28);

    // ── przeliczanie współrzędnych ────────────────────────────────
    const drawW = W - PAD.l - PAD.r;
    const drawH = H - PAD.t - PAD.b;
    const scaleX = drawW / (xMax - xMin);
    const scaleY = drawH / (yMax - yMin);
    const sc = Math.min(scaleX, scaleY);

    const vW = (xMax - xMin) * sc, vH = (yMax - yMin) * sc;
    const offX = PAD.l + (drawW - vW) / 2;
    const offY = PAD.t + (drawH - vH) / 2;

    const tx = x => r2(offX + (x - xMin) * sc);
    const ty = y => r2(offY + (yMax - y) * sc);

    const ox = tx(0), oy = ty(0);
    const axisXvis = oy >= PAD.t && oy <= H - PAD.b;
    const axisYvis = ox >= PAD.l && ox <= W - PAD.r;

    const step = gridStep(Math.max(xMax - xMin, yMax - yMin));
    const clipId = 'c' + Math.random().toString(36).slice(2, 7);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;max-width:100%">`;

    // tło
    svg += `<rect width="${W}" height="${H}" rx="10" fill="${C.bg}" stroke="${C.border}" stroke-width="1"/>`;

    // clip
    svg += `<defs><clipPath id="${clipId}"><rect x="${PAD.l}" y="${PAD.t}" width="${drawW}" height="${drawH}"/></clipPath></defs>`;
    svg += `<g clip-path="url(#${clipId})">`;

    // ── siatka ──────────────────────────────────────────────────
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x % step !== 0) continue;
      svg += `<line x1="${tx(x)}" y1="${PAD.t}" x2="${tx(x)}" y2="${H - PAD.b}" stroke="${C.grid}" stroke-width="1"/>`;
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y % step !== 0) continue;
      svg += `<line x1="${PAD.l}" y1="${ty(y)}" x2="${W - PAD.r}" y2="${ty(y)}" stroke="${C.grid}" stroke-width="1"/>`;
    }

    // ── osie ────────────────────────────────────────────────────
    if (axisXvis) {
      svg += `<line x1="${PAD.l - 2}" y1="${oy}" x2="${W - PAD.r + 10}" y2="${oy}" stroke="${C.axis}" stroke-width="1.5"/>`;
      svg += `<polygon points="${W-PAD.r+10},${oy} ${W-PAD.r+4},${oy-3} ${W-PAD.r+4},${oy+3}" fill="${C.axis}"/>`;
    }
    if (axisYvis) {
      svg += `<line x1="${ox}" y1="${H - PAD.b + 2}" x2="${ox}" y2="${PAD.t - 10}" stroke="${C.axis}" stroke-width="1.5"/>`;
      svg += `<polygon points="${ox},${PAD.t-10} ${ox-3},${PAD.t-4} ${ox+3},${PAD.t-4}" fill="${C.axis}"/>`;
    }

    // ── podziałki i etykiety ─────────────────────────────────────
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0 || x % step !== 0) continue;
      const sx = tx(x), sy = axisXvis ? oy : H - PAD.b;
      svg += `<line x1="${sx}" y1="${r2(sy - 3)}" x2="${sx}" y2="${r2(sy + 3)}" stroke="${C.tick}" stroke-width="1"/>`;
      svg += `<text x="${sx}" y="${r2(sy + 13)}" fill="${C.tickLbl}" font-size="9" font-family="${FONT}" text-anchor="middle">${x}</text>`;
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0 || y % step !== 0) continue;
      const sy = ty(y), sx = axisYvis ? ox : PAD.l;
      svg += `<line x1="${r2(sx - 3)}" y1="${sy}" x2="${r2(sx + 3)}" y2="${sy}" stroke="${C.tick}" stroke-width="1"/>`;
      svg += `<text x="${r2(sx - 6)}" y="${r2(sy + 3)}" fill="${C.tickLbl}" font-size="9" font-family="${FONT}" text-anchor="end">${y}</text>`;
    }

    // ── obiekty ──────────────────────────────────────────────────
    objects.forEach(o => {
      if (o.type === 'circle') {
        svg += `<circle cx="${tx(o.cx)}" cy="${ty(o.cy)}" r="${r2(o.r * sc)}" fill="none" stroke="${o.color || C.circle}" stroke-width="2"/>`;
        // Środek okręgu — mały punkt
        svg += `<circle cx="${tx(o.cx)}" cy="${ty(o.cy)}" r="2" fill="${o.color || C.circle}" opacity="0.6"/>`;
      }

      if (o.type === 'line') {
        const cl = clipLine(o.x1, o.y1, o.x2 - o.x1, o.y2 - o.y1, xMin, xMax, yMin, yMax);
        if (cl) {
          const dash = o.dash ? 'stroke-dasharray="6,3"' : '';
          svg += `<line x1="${tx(cl[0])}" y1="${ty(cl[1])}" x2="${tx(cl[2])}" y2="${ty(cl[3])}" stroke="${o.color || C.line}" stroke-width="2" ${dash}/>`;
        }
      }

      if (o.type === 'segment') {
        const dash = o.dash ? 'stroke-dasharray="5,3"' : '';
        svg += `<line x1="${tx(o.x1)}" y1="${ty(o.y1)}" x2="${tx(o.x2)}" y2="${ty(o.y2)}" stroke="${o.color || C.seg}" stroke-width="1.5" ${dash}/>`;
      }

      if (o.type === 'distSeg') {
        // Kreska od P do stopy prostopadłej
        svg += `<line x1="${tx(o.px)}" y1="${ty(o.py)}" x2="${tx(o.fx)}" y2="${ty(o.fy)}" stroke="${C.perpDot}" stroke-width="1.5" stroke-dasharray="5,3"/>`;
        // Znak kąta prostego w stopie
        const dx = o.lx2 - o.lx1, dy = o.ly2 - o.ly1;
        const len = Math.sqrt(dx*dx + dy*dy);
        if (len > 1e-9) {
          const sz = 5 / sc;                           // rozmiar w jednostkach math
          const ux = dx/len, uy = dy/len;              // jednostkowy wzdłuż linii
          // kierunek ku P od stopy
          const toPx = o.px - o.fx, toPy = o.py - o.fy;
          const dot = toPx * (-uy) + toPy * ux;       // sprawdź orientację
          const vx = dot >= 0 ? -uy : uy;
          const vy = dot >= 0 ?  ux : -ux;
          const A = [o.fx + ux*sz,        o.fy + uy*sz];
          const B = [o.fx + ux*sz + vx*sz, o.fy + uy*sz + vy*sz];
          const D = [o.fx + vx*sz,        o.fy + vy*sz];
          svg += `<polyline points="${tx(A[0])},${ty(A[1])} ${tx(B[0])},${ty(B[1])} ${tx(D[0])},${ty(D[1])}" fill="none" stroke="${C.muted}" stroke-width="1"/>`;
        }
      }

      if (o.type === 'point') {
        const px = tx(o.x), py = ty(o.y);
        const col = o.color || C.pBlue;
        svg += `<circle cx="${px}" cy="${py}" r="4.5" fill="${col}" stroke="${C.bg}" stroke-width="2"/>`;
        if (o.label) {
          const lx = r2(+px + (o.lx || 9));
          const ly = r2(+py + (o.ly || -7));
          svg += `<text x="${lx}" y="${ly}" fill="${C.label}" font-size="12" font-weight="600" font-family="${FONT}">${o.label}</text>`;
        }
      }
    });

    svg += `</g>`; // koniec clipa

    // etykiety osi (poza clipem)
    if (axisXvis) svg += `<text x="${W-PAD.r+13}" y="${r2(oy+4)}" fill="${C.tickLbl}" font-size="11" font-family="${FONT}">x</text>`;
    if (axisYvis) svg += `<text x="${r2(ox+5)}" y="${PAD.t-13}" fill="${C.tickLbl}" font-size="11" font-family="${FONT}">y</text>`;
    if (axisXvis && axisYvis) svg += `<text x="${r2(ox-12)}" y="${r2(oy+12)}" fill="${C.tickLbl}" font-size="9" font-family="${FONT}">0</text>`;

    svg += `</svg>`;
    return svg;
  }

  // ════════════════════════════════════════════════════════════════
  //  DIAGRAMY cat11 — Geometria analityczna
  // ════════════════════════════════════════════════════════════════

  function diagramCircleTangent({ cx, cy, r, px, py }) {
    const A = px - cx, B = py - cy;
    // Styczna: A(x-cx)+B(y-cy)=r²  →  drugi punkt na stycznej
    let tx2, ty2;
    if (Math.abs(B) > 1e-9) {
      tx2 = px + 6;
      ty2 = (r*r - A*(tx2 - cx)) / B + cy;
    } else {
      tx2 = px;
      ty2 = py + 6;
    }

    // Etykieta P: odpychaj od środka okręgu
    const lx = px >= cx ? 9 : -18;
    const ly = py >= cy ? 14 : -9;

    return buildCoord([
      { type: 'circle',  cx, cy, r },
      { type: 'line',    x1: px, y1: py, x2: tx2, y2: ty2, color: C.tangent },
      { type: 'segment', x1: cx, y1: cy, x2: px,  y2: py,  dash: true },
      { type: 'point',   x: cx, y: cy, color: C.circle, label: 'S', lx: 7, ly: -8 },
      { type: 'point',   x: px, y: py, color: C.pRed,   label: 'P', lx, ly },
    ]);
  }

  function diagramLineEquation({ x1, y1, x2, y2 }) {
    // Etykiety: odpychamy A w lewo, B w prawo względem linii
    const dx = x2 - x1, dy = y2 - y1;
    const lAx = dx <= 0 ? 9  : -18;
    const lBx = dx >= 0 ? 9  : -18;

    return buildCoord([
      { type: 'line',  x1, y1, x2, y2 },
      { type: 'point', x: x1, y: y1, label: 'A', lx: lAx, ly: -9 },
      { type: 'point', x: x2, y: y2, label: 'B', lx: lBx, ly: -9 },
    ]);
  }

  function diagramPointLineDistance({ a, b, px, py }) {
    // Prosta: y = a·x + b, dwa punkty dla silnika
    const lx1 = px - 6, ly1 = a*lx1 + b;
    const lx2 = px + 6, ly2 = a*lx2 + b;
    const [fx, fy] = footOfPerp(px, py, lx1, ly1, lx2, ly2);

    // Etykieta P: po stronie, gdzie P jest względem linii
    const side = py - (a*px + b);
    const ly = side >= 0 ? -11 : 16;

    return buildCoord([
      { type: 'line',    x1: lx1, y1: ly1, x2: lx2, y2: ly2 },
      { type: 'distSeg', px, py, fx, fy, lx1, ly1, lx2, ly2 },
      { type: 'point',   x: px, y: py, color: C.pRed, label: 'P', lx: 8, ly },
      { type: 'point',   x: fx, y: fy, color: C.muted },
    ]);
  }

  function diagramCircleEquation({ cx, cy, r }) {
    return buildCoord([
      { type: 'circle',  cx, cy, r },
      { type: 'segment', x1: cx, y1: cy, x2: cx + r, y2: cy },
      { type: 'point',   x: cx, y: cy, color: C.circle, label: 'S', lx: 7, ly: -9 },
      // etykieta promienia na środku odcinka
      { type: 'point',   x: cx + r/2, y: cy, color: 'transparent',
        label: 'r', lx: -3, ly: -8 },
    ]);
  }

  // ════════════════════════════════════════════════════════════════
  //  DIAGRAMY cat10 — Stereometria (figury geometryczne 2D)
  // ════════════════════════════════════════════════════════════════

  /** Trójkąt prostokątny (podstawa graniastosłupa): kąt prosty przy C */
  function diagramRightTriangle({ catA, catB, height }) {
    const W2 = 320, H2 = 215;
    const ML = 48, MR = 30, MT = 24, MB = 36;

    const scX = (W2 - ML - MR) / catA;
    const scY = (H2 - MT - MB) / catB;
    const sc = Math.min(scX, scY, 28); // max 28 px/jednostkę

    const Cx = ML,           Cy = H2 - MB;
    const Ax = ML + catA*sc, Ay = H2 - MB;
    const Bx = ML,           By = H2 - MB - catB*sc;

    const hypLen = Math.sqrt(catA*catA + catB*catB);
    const hypNice = Number.isInteger(hypLen) ? String(hypLen) : null;

    let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}" style="display:block;max-width:100%">`;
    s += `<rect width="${W2}" height="${H2}" rx="10" fill="${C.bg}" stroke="${C.border}" stroke-width="1"/>`;

    // Trójkąt — wypełnienie
    s += `<polygon points="${Cx},${Cy} ${Ax},${Ay} ${Bx},${By}" fill="rgba(91,141,238,0.06)" stroke="${C.line}" stroke-width="2" stroke-linejoin="round"/>`;

    // Znak kąta prostego przy C
    const sq = 10;
    s += `<polyline points="${Cx+sq},${Cy} ${Cx+sq},${Cy-sq} ${Cx},${Cy-sq}" fill="none" stroke="${C.muted}" stroke-width="1.5"/>`;

    // Etykiety boków
    const midCAx = (Cx + Ax) / 2, midCAy = Cy + 20;
    s += `<text x="${midCAx}" y="${midCAy}" fill="${C.label}" font-size="14" font-weight="600" font-family="${FONT}" text-anchor="middle">${catA}</text>`;

    const midCBx = Cx - 20, midCBy = (Cy + By) / 2 + 4;
    s += `<text x="${midCBx}" y="${midCBy}" fill="${C.label}" font-size="14" font-weight="600" font-family="${FONT}" text-anchor="middle">${catB}</text>`;

    if (hypNice) {
      const midABx = (Ax + Bx) / 2 + 18;
      const midABy = (Ay + By) / 2;
      s += `<text x="${midABx}" y="${midABy}" fill="${C.muted}" font-size="12" font-family="${FONT}">${hypNice}</text>`;
    }

    // Wysokość graniastosłupa (po prawej od trójkąta)
    if (height) {
      const hx = Ax + 20;
      const htop = By, hbot = Ay;
      s += `<line x1="${hx}" y1="${htop}" x2="${hx}" y2="${hbot}" stroke="${C.seg}" stroke-width="1.5" stroke-dasharray="4,2"/>`;
      s += `<line x1="${hx-5}" y1="${htop}" x2="${hx+5}" y2="${htop}" stroke="${C.seg}" stroke-width="1.5"/>`;
      s += `<line x1="${hx-5}" y1="${hbot}" x2="${hx+5}" y2="${hbot}" stroke="${C.seg}" stroke-width="1.5"/>`;
      s += `<text x="${hx + 9}" y="${(htop + hbot)/2 + 4}" fill="${C.muted}" font-size="12" font-family="${FONT}">${height}</text>`;
    }

    // Wierzchołki
    const vs = [['C', Cx-16, Cy+5], ['A', Ax+7, Ay+5], ['B', Bx-16, By-5]];
    vs.forEach(([lbl, lx, ly]) => {
      s += `<text x="${lx}" y="${ly}" fill="${C.label}" font-size="13" font-weight="700" font-family="${FONT}">${lbl}</text>`;
    });

    s += `</svg>`;
    return s;
  }

  /** Ostrosłup prawidłowy czworokątny — rzut z boku (trójkąt + apotema) */
  function diagramPyramid({ a, H: height }) {
    const W2 = 320, H2 = 215;
    const ML = 44, MR = 44, MT = 28, MB = 36;

    const maxW = W2 - ML - MR, maxH = H2 - MT - MB;
    const scX = maxW / a, scY = maxH / height;
    const sc = Math.min(scX, scY, 26);

    const baseW = a * sc, baseH = height * sc;
    const baseY = H2 - MB;
    const baseX0 = (W2 - baseW) / 2;
    const apexX = W2 / 2, apexY = baseY - baseH;
    const m = a / 2; // apotema podstawy

    let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}" style="display:block;max-width:100%">`;
    s += `<rect width="${W2}" height="${H2}" rx="10" fill="${C.bg}" stroke="${C.border}" stroke-width="1"/>`;

    // Bok ostrosłupa (widok z przodu: trójkąt równoboczny)
    const Lx = baseX0, Ly = baseY;
    const Rx = baseX0 + baseW, Ry = baseY;
    s += `<polygon points="${Lx},${Ly} ${Rx},${Ry} ${apexX},${apexY}" fill="rgba(91,141,238,0.06)" stroke="${C.line}" stroke-width="2" stroke-linejoin="round"/>`;

    // Podstawa (linia pozioma)
    s += `<line x1="${Lx}" y1="${Ly}" x2="${Rx}" y2="${Ry}" stroke="${C.line}" stroke-width="2"/>`;

    // Wysokość H (przerywana pionowa od wierzchołka do środka podstawy)
    const midX = (Lx + Rx) / 2;
    s += `<line x1="${midX}" y1="${apexY}" x2="${midX}" y2="${baseY}" stroke="${C.tangent}" stroke-width="1.5" stroke-dasharray="5,3"/>`;
    // znak kąta prostego w środku podstawy
    const sq2 = 8;
    s += `<polyline points="${midX+sq2},${baseY} ${midX+sq2},${baseY-sq2} ${midX},${baseY-sq2}" fill="none" stroke="${C.muted}" stroke-width="1.2"/>`;

    // Apotema m (połowa podstawy — od środka do prawego boku)
    s += `<line x1="${midX}" y1="${baseY}" x2="${Rx}" y2="${baseY}" stroke="${C.circle}" stroke-width="2"/>`;

    // Etykiety
    s += `<text x="${midX + 7}" y="${(apexY + baseY)/2 + 4}" fill="${C.tangent}" font-size="12" font-weight="600" font-family="${FONT}">H=${height}</text>`;
    s += `<text x="${(midX + Rx)/2 - 4}" y="${baseY + 18}" fill="${C.circle}" font-size="12" font-weight="600" font-family="${FONT}" text-anchor="middle">m=${m}</text>`;
    s += `<text x="${(Lx + Rx)/2}" y="${baseY + 18}" fill="${C.label}" font-size="13" font-weight="600" font-family="${FONT}" text-anchor="middle">a=${a}</text>`;

    // Wierzchołek S
    s += `<circle cx="${apexX}" cy="${apexY}" r="4" fill="${C.pBlue}" stroke="${C.bg}" stroke-width="2"/>`;
    s += `<text x="${apexX + 8}" y="${apexY + 4}" fill="${C.label}" font-size="13" font-weight="700" font-family="${FONT}">S</text>`;

    s += `</svg>`;
    return s;
  }

  /** Prostopadłościan — rzut izometryczny (uproszczony) */
  function diagramCuboid({ a, b, c }) {
    const W2 = 320, H2 = 210;
    const iso = 0.4; // nachylenie izometryczne

    // Skalowanie: dopasuj do okna
    const maxDim = Math.max(a + b*iso, b*iso + c);
    const sc = Math.min((W2 - 80) / (a + b*iso), (H2 - 60) / (b*iso + c), 22);

    const ox = 55, oy = H2 - 36; // punkt startowy (dolny lewy)

    // 8 wierzchołków w rzucie 2D
    function pt(xi, yi, zi) {
      return [
        r2(ox + (xi * a + zi * b * iso) * sc),
        r2(oy - (yi * c + zi * b * iso) * sc),
      ];
    }

    const verts = [
      pt(0,0,0), pt(1,0,0), pt(1,1,0), pt(0,1,0), // dolna podstawa
      pt(0,0,1), pt(1,0,1), pt(1,1,1), pt(0,1,1),  // górna podstawa
    ];
    const [A,B,C_,D,E,F,G,H_] = verts; // A'B'C'D' na górze to E,F,G,H_

    const p = pts => pts.map(([x,y]) => `${x},${y}`).join(' ');

    let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}" style="display:block;max-width:100%">`;
    s += `<rect width="${W2}" height="${H2}" rx="10" fill="${C.bg}" stroke="${C.border}" stroke-width="1"/>`;

    // Tyłówki (przerywane)
    [[D,C_],[D,H_],[C_,G]].forEach(([p1,p2]) => {
      s += `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${C.seg}" stroke-width="1.2" stroke-dasharray="4,2.5" opacity="0.7"/>`;
    });

    // Ściany widoczne: front (A,B,F,E), prawy (B,C_,G,F), górna (E,F,G,H_)
    const faces = [
      [A, B, F, E],  // front
      [B, C_, G, F], // prawy
      [E, F, G, H_], // góra
    ];
    const fills = ['rgba(91,141,238,0.07)', 'rgba(91,141,238,0.04)', 'rgba(91,141,238,0.11)'];
    faces.forEach((face, i) => {
      s += `<polygon points="${p(face)}" fill="${fills[i]}" stroke="${C.line}" stroke-width="1.8" stroke-linejoin="round"/>`;
    });

    // Krawędzie dolne
    [[A,B],[B,C_],[A,D]].forEach(([p1,p2]) => {
      s += `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${C.line}" stroke-width="1.8"/>`;
    });

    // Etykiety krawędzi
    const midAB = [(A[0]+B[0])/2, (A[1]+B[1])/2+16];
    const midBF = [(B[0]+F[0])/2+8, (B[1]+F[1])/2+4];
    const midBC = [(B[0]+C_[0])/2, (B[1]+C_[1])/2+5];

    s += `<text x="${midAB[0]}" y="${midAB[1]}" fill="${C.label}" font-size="13" font-weight="600" font-family="${FONT}" text-anchor="middle">a=${a}</text>`;
    s += `<text x="${midBF[0]}" y="${midBF[1]}" fill="${C.label}" font-size="13" font-weight="600" font-family="${FONT}">c=${c}</text>`;
    s += `<text x="${midBC[0]-6}" y="${midBC[1]}" fill="${C.label}" font-size="13" font-weight="600" font-family="${FONT}" text-anchor="middle">b=${b}</text>`;

    // Etykiety wierzchołków A, B, C, D, A', B', C', D'
    const lbls = [
      [A, 'A', -14,  6],
      [B, 'B',   6,  6],
      [C_,'C',   4, 12],
      [E, "A'", -16, -5],
      [F, "B'",   5, -5],
      [G, "C'",   5, -5],
      [H_,"D'", -18, -5],
    ];
    lbls.forEach(([[x,y], lbl, dx, dy]) => {
      s += `<text x="${r2(x+dx)}" y="${r2(y+dy)}" fill="${C.muted}" font-size="10" font-family="${FONT}">${lbl}</text>`;
    });

    s += `</svg>`;
    return s;
  }

  // ════════════════════════════════════════════════════════════════
  //  PUBLIC API
  // ════════════════════════════════════════════════════════════════

  function generate(task) {
    if (!task?.params) return null;
    const p = task.params;
    try {
      switch (task.type) {
        case 'circle_tangent':      return diagramCircleTangent(p);
        case 'line_equation':       return diagramLineEquation(p);
        case 'point_line_distance': return diagramPointLineDistance(p);
        case 'circle_equation':     return diagramCircleEquation(p);
        case 'triangular_prism':    return diagramRightTriangle(p);
        case 'regular_pyramid':     return diagramPyramid(p);
        case 'cuboid':              return diagramCuboid(p);
        default:                    return null;
      }
    } catch (e) {
      console.warn('DiagramRenderer:', e);
      return null;
    }
  }

  return { generate };
})();
