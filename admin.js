// Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// 사용자가 제공한 Firebase Config 설정
const firebaseConfig = {
    apiKey: "AIzaSyAW3-B_e6yP2XbVpU-Bw6o0nJ04Rk71I-k",
    authDomain: "office-test-6d4ad.firebaseapp.com",
    projectId: "office-test-6d4ad",
    storageBucket: "office-test-6d4ad.appspot.com",
    messagingSenderId: "302820542385",
    appId: "1:302820542385:web:a6d36e8b4eeb8fb4b281b3"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 유형 이름 매핑
const typeNames = {
    "ACE": "속앓이 팩트체커",
    "ACF": "소심한 솔로몬",
    "ADE": "브레이크 고장난 불도저",
    "ADF": "외유내강 팩트폭격기",
    "BCE": "유리멘탈 평화주의자",
    "BCF": "눈치백단 예스맨",
    "BDE": "단호박 스펀지",
    "BDF": "마음 해독 마스터"
};

// 파이어베이스에서 데이터를 읽어와서 화면을 그리는 함수
async function fetchStatsAndRender() {
    try {
        const statDocRef = doc(db, "stats", "typeCounts");
        const docSnap = await getDoc(statDocRef);

        let fbData = {};
        if (docSnap.exists()) {
            fbData = docSnap.data(); 
        } else {
            fbData = { "ACE":0, "ACF":0, "ADE":0, "ADF":0, "BCE":0, "BCF":0, "BDE":0, "BDF":0 };
        }

        const typeStats = {};
        for (const [code, count] of Object.entries(fbData)) {
             const name = typeNames[code] || code;
             typeStats[name] = { code: code, count: count };
        }

        renderDashboard(typeStats);

    } catch (e) {
        console.error("데이터 로딩 실패:", e);
        document.getElementById("total-users").innerText = "오류 발생";
    }
}

// 화면과 차트를 그리는 함수
function renderDashboard(typeStats) {
    const total = Object.values(typeStats).reduce((acc, cur) => acc + cur.count, 0);
    document.getElementById("total-users").innerText = total.toLocaleString() + "명";

    let maxCount = -1, topName = "-";
    for (const [name, data] of Object.entries(typeStats)) {
        if (data.count > maxCount) { maxCount = data.count; topName = name; }
    }
    document.getElementById("top-type").innerText = topName;

    const sorted = Object.entries(typeStats).sort((a, b) => b[1].count - a[1].count);
    const tbody = document.querySelector("#typeTable tbody");
    tbody.innerHTML = ""; 

    sorted.forEach(([name, data], index) => {
        let percent = total === 0 ? "0.0" : ((data.count / total) * 100).toFixed(1);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${name}</strong> <span class="badge">${data.code}</span></td>
            <td>${data.count.toLocaleString()}명</td>
            <td class="pct">${percent}%</td>`;
        tbody.appendChild(row);
    });

    const ctx = document.getElementById('typeChart').getContext('2d');
    
    if (window.myChart) {
        window.myChart.destroy();
    }

    const chartLabels = sorted.map(([name]) => name);
    const chartData   = sorted.map(([, data]) => data.count);

    window.myChart = new Chart(ctx, {
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
            indexAxis: 'y',          
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            let pct = total === 0 ? "0.0" : ((ctx.parsed.x / total) * 100).toFixed(1);
                            return ` ${ctx.parsed.x.toLocaleString()}명 (${pct}%)`;
                        }
                    }
                }
            },
            scales: {
                x: { beginAtZero: true }
            }
        }
    });
}

// 스크립트 실행 시 통계 데이터 로딩 시작
fetchStatsAndRender();
