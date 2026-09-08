// 현재는 UI 확인용 샘플 데이터입니다.
// 추후 Firebase Firestore 연결 시 이 객체를 DB 데이터로 교체하면 실시간 통계가 작동합니다.
const typeStats = {
    "속앓이 팩트체커":      { code: "ACE", count: 185 },
    "소심한 솔로몬":        { code: "ACF", count: 240 },
    "브레이크 고장난 불도저": { code: "ADE", count: 110 },
    "외유내강 팩트폭격기":   { code: "ADF", count: 320 },
    "유리멘탈 평화주의자":   { code: "BCE", count: 195 },
    "눈치백단 예스맨":      { code: "BCF", count: 275 },
    "단호박 스펀지":        { code: "BDE", count: 140 },
    "마음 해독 마스터":     { code: "BDF", count: 215 }
};

// ── 1. 통계 계산 ──
const total = Object.values(typeStats).reduce((acc, cur) => acc + cur.count, 0);
document.getElementById("total-users").innerText = total.toLocaleString() + "명";

let maxCount = -1, topName = "-";
for (const [name, data] of Object.entries(typeStats)) {
    if (data.count > maxCount) { maxCount = data.count; topName = name; }
}
document.getElementById("top-type").innerText = topName;

// ── 2. 테이블 렌더링 (순위 포함) ──
const sorted = Object.entries(typeStats).sort((a, b) => b[1].count - a[1].count);
const tbody  = document.getElementById("table-body");
sorted.forEach(([name, data], idx) => {
    const percent = ((data.count / total) * 100).toFixed(1);
    const row = document.createElement("tr");
    row.innerHTML = `
        <td style="color:#bbb;font-weight:600;">${idx + 1}</td>
        <td style="font-weight:700;">${name}</td>
        <td><span class="badge">${data.code}</span></td>
        <td>${data.count.toLocaleString()}명</td>
        <td class="pct">${percent}%</td>`;
    tbody.appendChild(row);
});

// ── 3. 차트 렌더링 (x축 라벨 겹침 방지: indexAxis:'y' 수평 바) ──
const ctx = document.getElementById('typeChart').getContext('2d');

// 참여수 기준 내림차순
const chartLabels = sorted.map(([name]) => name);
const chartData   = sorted.map(([, data]) => data.count);

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: chartLabels,
        datasets: [{
            label: '참여 수',
            data: chartData,
            backgroundColor: chartData.map((_, i) =>
                `hsla(${210 + i * 18}, 65%, 55%, 0.78)`
            ),
            borderWidth: 0,
            borderRadius: 6,
        }]
    },
    options: {
        indexAxis: 'y',          // ← 수평 막대: 한글 긴 라벨 겹침 완전 해결
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: ctx => ` ${ctx.parsed.x.toLocaleString()}명 (${((ctx.parsed.x / total) * 100).toFixed(1)}%)`
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: { color: '#f0f0f0' },
                ticks: { font: { size: 12 } }
            },
            y: {
                grid: { display: false },
                ticks: { font: { size: 13, weight: '600' } }
            }
        }
    }
});
