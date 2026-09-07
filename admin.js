// 현재는 UI 확인용 샘플 데이터입니다.
// 추후 파이어베이스(Firestore)를 연결할 때 이 객체에 DB 데이터를 덮어씌우면 실시간 통계가 작동합니다.
const typeStats = {
    "속앓이 팩트체커": { code: "ACE", count: 185 },
    "소심한 솔로몬": { code: "ACF", count: 240 },
    "브레이크 고장난 불도저": { code: "ADE", count: 110 },
    "외유내강 팩트폭격기": { code: "ADF", count: 320 },
    "유리멘탈 평화주의자": { code: "BCE", count: 195 },
    "눈치백단 예스맨": { code: "BCF", count: 275 },
    "단호박 스펀지": { code: "BDE", count: 140 },
    "마음 해독 마스터": { code: "BDF", count: 215 }
};

// 1. 총 참여자 수 및 1위 유형 계산
const total = Object.values(typeStats).reduce((acc, cur) => acc + cur.count, 0);
document.getElementById("total-users").innerText = total.toLocaleString() + "명";

let maxCount = -1;
let topName = "-";
for (const [name, data] of Object.entries(typeStats)) {
    if (data.count > maxCount) {
        maxCount = data.count;
        topName = name;
    }
}
document.getElementById("top-type").innerText = topName;

// 2. 테이블 행 렌더링
const tbody = document.getElementById("table-body");
for (const [name, data] of Object.entries(typeStats)) {
    const percent = ((data.count / total) * 100).toFixed(1);
    tbody.innerHTML += `
        <tr>
            <td style="font-weight:600;">${name}</td>
            <td style="color:#888;">${data.code}</td>
            <td>${data.count.toLocaleString()}명</td>
            <td style="font-weight:bold; color:#4CAF50;">${percent}%</td>
        </tr>
    `;
}

// 3. 막대 차트 렌더링
const ctx = document.getElementById('typeChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys(typeStats),
        datasets: [{
            label: '참여 수',
            data: Object.values(typeStats).map(d => d.count),
            backgroundColor: 'rgba(76, 175, 80, 0.7)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1.5,
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});
