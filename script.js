// Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// 사용자가 제공한 Firebase Config 설정
const firebaseConfig = {
    apiKey: "AIzaSy8b8jjYHPMujf1TVfpAJlus30ftqYVwvLU",
    authDomain: "bicheatkey.firebaseapp.com",
    projectId: "bicheatkey",
    storageBucket: "bicheatkey.firebasestorage.app",
    messagingSenderId: "969350953002",
    appId: "1:969350953002:web:b98f2251853b01957d2b53"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

try {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
} catch (e) {}

const questions = [
    {
        q: '"연봉 얼마예요?"\n선 넘는 질문을 받는다면?',
        img: "assets/q001.png",
        options: [
            { text: '"그게 왜 궁금한데요?"<br>불쾌함을 표현한다', type: "A" },
            { text: '"글쎄요, 요즘 n년차 평균 연봉이 얼마죠?"<br>말을 돌린다', type: "B" }
        ]
    },
    {
        q: "상대가 나에게 언성을 높인다면?",
        img: "assets/q002.png",
        options: [
            { text: '"제가 잘못했다는 건가요?"<br>맞받아친다', type: "A" },
            { text: '"자리를 좀 옮기실까요?"<br>감정 흐름을 전환한다', type: "B" }
        ]
    },
    {
        q: "지각을 밥 먹듯 하는 후배에게\n쓴소리를 한다면?",
        img: "assets/q003.png",
        options: [
            { text: '팩트 체크<br>"오늘까지 세 번째네요"', type: "A" },
            { text: '감정 전달<br>"요즘 무슨 일 있어요? 걱정되네"', type: "B" }
        ]
    },
    {
        q: "업무 의견이 갈려서 고민 중이라면?",
        img: "assets/q004.png",
        options: [
            { text: "논리가 합리적인지, 현실성 있는지 따져본다", type: "A" },
            { text: "의견을 낸 상대에게 경험과 배경을 묻는다", type: "B" }
        ]
    },
    {
        q: "상사가 '저녁에 술 한잔?'하며\n곤란한 부탁을 한다면?",
        img: "assets/q005.png",
        options: [
            { text: "내키지 않아도 사회생활이니 일단 나간다", type: "C" },
            { text: '"오늘은 안 되고 다음 주는 괜찮습니다."<br>역으로 일정을 제안', type: "D" }
        ]
    },
    {
        q: "회의 중 두 가지 시안을 골라야 한다면?",
        img: "assets/q006.png",
        options: [
            { text: '"B가 더 낫다고 하네요?"<br>주어를 뺀다', type: "C" },
            { text: '"저는 A보단 B가 좋아요"<br>나를 주어로 쓴다', type: "D" }
        ]
    },
    {
        q: "누군가 나를 칭찬한다면?",
        img: "assets/q007.png",
        options: [
            { text: '"아유 과찬이세요~"<br>반사적으로 부정', type: "C" },
            { text: '"과장님도 오늘 멋지신데요?"<br>칭찬을 되돌려준다', type: "D" }
        ]
    },
    {
        q: "메시지를 보냈는데 안 읽는다면?",
        img: "assets/q008.png",
        options: [
            { text: '"내가 실수했나?"<br>불안해서 덧붙일 말을 찾는다', type: "C" },
            { text: "그냥 기다린다", type: "D" }
        ]
    },
    {
        q: "다른 팀에 부탁할 일이 생긴다면?",
        img: "assets/q009.png",
        options: [
            { text: '"이거 금방 끝나요!"<br>장점만 어필해서 넘긴다', type: "E" },
            { text: '"조금 번거로우실 텐데 부탁드리겠습니다!"<br>불편함을 인정한다', type: "F" }
        ]
    },
    {
        q: "누군가 상식에 안 맞는 행동을 할 때 나는?",
        img: "assets/q010.png",
        options: [
            { text: "'저건 틀린 행동이지'<br>도덕적인 관점으로 판단", type: "E" },
            { text: "'내 가치관으론 불편하네'<br>내 가치관으로 판단", type: "F" }
        ]
    },
    {
        q: "내 의견을 강하게 주장해야 한다면?",
        img: "assets/q011.png",
        options: [
            { text: '"이게 맞겠습니다"<br>흔들림 없이 말한다', type: "E" },
            { text: '"그럴 수도 있지만, 제 생각은~"<br>여지를 둔다', type: "F" }
        ]
    },
    {
        q: "인사를 건넨 상사의 표정이 굳어 있다면?",
        img: "assets/q012.png",
        options: [
            { text: "'내 기획안이 맘에 안 들었나?'<br>복잡한 이유들이 떠오른다", type: "E" },
            { text: "'어제 잠을 못 잤나?'<br>단순한 이유를 떠올린다", type: "F" }
        ]
    }
];

const results = {
    "ACE": { img: "assets/a001.png", title: "속앓이 팩트체커", desc: "\"겉으론 네~ 속으론 논리 반박 엑셀표 돌리는 중\"\n\n최근에 속으로 '아니 그게 상식적으로 말이 되나?'라고\n수백 번 외친 적 있지 않으시나요?\n겉으로는 무례한 상황에서도 조용히 고개를 끄덕이지만,\n머릿속에서는 이미 상대의 논리적 오류를 지적하는\n팩트체크가 끝났습니다.\n\n퇴근길 카톡방에서 친구들에게 폭풍 사이다를 쏟아내는 당신!\n가끔은 그 날카로운 팩트를 현실에서도 슬쩍 꺼내어\n내 멘탈을 지켜보는 건 어떨까요?", solution: "'복잡하게 생각하는 것이 깊이 생각하는 것처럼 느껴질 때가 있다.\n하지만 많은 경우 그것은 깊이가 아니라 혼란이다.\n판단력은 더 많이 덧붙이는 능력이 아니라,\n필요 없는 것을 덜어내는 능력에 가깝다.'\n\n(p.114)" },
    "ACF": { img: "assets/a002.png", title: "소심한 솔로몬", desc: "\"내 마음속 재판장에선 이미 넌 유죄\"\n\n선 넘는 말을 들었을 때, 대놓고 화내진 못하고 '아.. 네..' 하며\n어색하게 웃어넘긴 적 있으시죠?\n평화를 사랑해서 갈등은 피하고 싶지만,\n나만의 확고한 가치관 레이더에는 상대방의 무례함을\n다 포착하고 있습니다.\n\n분위기 깰까 봐 꾹 참다가 자기 전 침대에서\n'아까 이렇게 받아칠 걸!' 하고 이불킥하는 당신.\n조금은 이기적이어도 괜찮을 것 같아요!", solution: "주어가 분명한 말에는 그 사람이 어떤 기준으로 생각하고\n판단하는지가 담긴다.\n그리고 상대는 단순한 정보보다 그 말 안에 담긴\n화자의 태도와 관점을 기억한다.\n결국 오래 남는 말은 완벽한 표현이 아니라,\n말하는 사람이 느껴지는 말이다.\n\n(p.161)" },
    "ADE": { img: "assets/a003.png", title: "브레이크 고장난 불도저", desc: "\"할 말은 해야 되는 오피스 사이다\"\n\n최근 답답하게 일하거나 선 넘는 동료를 보며\n'내가 하고 말지'라며 키보드 샷건을 칠 뻔한 당신!\n빙빙 돌려 말하는 건 딱 질색,\n눈치 보며 참느니 팩트로 꽂아버리는 직진 스타일입니다.\n\n하루에도 몇 번씩 '저 사람은 왜 저렇게 일하지?'라는\n생각이 스쳐 지나가죠.\n업무 효율은 최고지만, 때로는 그 솔직함이\n나를 더 피곤한 논쟁으로 끌고 갈 수 있으니\n한 템포 쉬어가는 브레이크도 필요해요.", solution: "잠깐의 완충은 이후 대화를 전혀 다른 방향으로 이끈다.\n\n감정이 격해질수록 말은 짧아져야 하고,\n그 짧은 말 중 가장 실용적으로 쓸 수 있다.\n\n(p.90, 91)" },
    "ADF": { img: "assets/a004.png", title: "외유내강 팩트폭격기", desc: "\"웃으며 뼈 때리기 기사 자격증 보유자\"\n\n당신은 모르겠지만, 동료들 사이에서 당신은\n'저 사람 진짜 똑똑하게 화낸다'는 평가를 받고 계실 거예요.\n무례한 상사의 압박에도 절대 감정적으로 흔들리지 않고,\n은은한 미소와 함께 논리적으로 할 말은 다 하는\n진정한 오피스 고수인 당신.\n\n겉보기엔 부드럽고 유연해 보이지만,\n속에는 절대 부러지지 않는 강철 심지가 박혀 있네요.\n누군가는 남몰래 당신을 오피스 롤모델로 삼고 있을지도 몰라요!", solution: "사람은 평가와 비난을 먼저 들으면 쉽게 방어적으로 반응하지만,\n감정과 욕구를 먼저 들으면 상대의 상태를 이해하게 된다.\n\n그래서 같은 문제를 말해도 표현 방식에 따라\n대화의 흐름은 크게 달라진다.\n감정을 먼저 꺼내면 상대는 맞고 틀림을 따지기보다,\n우선 내 상태를 듣게 된다.\n\n(p.167)" },
    "BCE": { img: "assets/a005.png", title: "유리멘탈 평화주의자", desc: "\"남의 기분 챙기다 내 속만 시커멓게 타들어감\"\n\n'그냥 내가 참자' 하고 남몰래 깊은 한숨 쉰 적이 많으시죠?\n다른 사람 기분 상할까 봐 싫은 소리 한마디 못 하고,\n칭찬을 들어도 부담스러워 어쩔 줄 모르는 당신.\n\n퇴근 후에도\n'아까 내가 한 말 때문에 그 사람 기분 상했으려나?' 하고\n끝없는 시뮬레이션을 돌리고 있네요.\n이제 남 챙기느라 정작 멍들고 있는 '내 멘탈'부터\n꼭 안아줄 시간이 왔습니다.", solution: "늘 좋은 사람처럼 보이기 위해 자기 감정을 억누르는 것은\n오히려 관계를 불안정하게 만들 수 있다.\n성숙하게 착한 사람은 친절을 베풀더라도\n자신을 지우지 않는다.\n\n(p.184)" },
    "BCF": { img: "assets/a006.png", title: "눈치백단 예스맨", desc: "\"인간 레이더망 가동! 분위기 싸해지는 건 딱 질색\"\n\n회사에서 '저 사람 오늘 기분 안 좋아 보이는데?'를\n가장 먼저 캐치하는 눈치 천재 아닌가요?\n어색하거나 불편한 상황을 견디지 못해,\n곤란한 부탁도 '제가 할게요!'라며 떠안은 적이\n한두 번이 아닐 겁니다.\n\n사회생활 만렙에 주변 평판은 최고지만,\n모두를 만족시키려다 내 에너지는 이미 방전 직전이네요.\n가끔은 '모르쇠'로 일관하며 나를 위한 퇴근을\n사수해 보세요!", solution: "사람은 완벽하게 포장된 말보다 현실적인 말을 더 믿는다.\n그리고 그 현실을 담담하게 인정할 줄 아는 사람이\n결국 더 신뢰받는다.\n\n(p.165)" },
    "BDE": { img: "assets/a007.png", title: "단호박 스펀지", desc: "\"절대 호구 안 당함! 웃으며 내 몫 챙기는 실속파\"\n\n스트레스받는 상황에서도 유연하게 대처하며\n절대 호구 잡히지 않는 당신!\n'아유~ 부장님 그건 좀 힘들 것 같아요^^'라며\n기분 나쁘지 않게 내 선을 완벽하게 지켜내는 타입입니다.\n\n상대방의 감정은 적당히 스펀지처럼 흡수해 주면서도,\n부당한 요구는 단호박처럼 잘라내는 스킬이 예술이네요.\n당신은 감정 소모는 최소화하고 챙길 건 다 챙기는\n진정한 의미의 스마트한 직장인입니다!", solution: "중요한 것은 선을 넘는 질문에\n반드시 성실하게 답해야 한다는 압박에서 벗어나는 것이다.\n대화에서 경계를 지키는 것은 까다로운 태도가 아니다.\n자신을 지키는 방식이다.\n\n(p.87)" },
    "BDF": { img: "assets/a008.png", title: "마음 해독 마스터", desc: "\"멘탈 방어력 만렙! 모두의 워너비\"\n\n주변에서 '너랑 얘기하면 마음이 편해'라는\n소리를 들어본 적 있지 않나요?\n\n당신은 상대방의 숨은 의도와 감정까지 찰떡같이 읽어내면서도,\n나만의 경계선은 명확하고 부드럽게 지켜냅니다.\n선 넘는 질문을 받아도 당황하지 않고\n'그렇게 생각하실 수도 있겠네요'라며 물 흐르듯 넘겨버리는\n멘탈 방어력의 소유자!\n웬만한 자극에는 끄떡없는 가장 이상적인 커뮤니케이터입니다.", solution: "논리보다 강한 것은 태도다.\n그리고 틀릴 수 있음을 인정하는 태도는\n어떤 논리보다 사람의 마음을 더 쉽게 연다.\n\n(p.67)" }
};

const loadingMessages = [
    "당신의 오피스 멘탈 유형 분석 중...",
    "선 긋기 방식 데이터 처리 중...",
    "딱 맞는 결과 찾는 중...",
    "거의 다 됐어요! 잠깐만요 😊"
];

let currentQuestion = 0;
let scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
let historyLog = [];
let imagesLoaded = false;

const mainScreen    = document.getElementById("main-screen");
const qScreen       = document.getElementById("question-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultScreen  = document.getElementById("result-screen");
const qContent      = document.getElementById("q-content");
const backBtn       = document.getElementById("back-btn");
const startBtn      = document.getElementById("start-btn");

function preloadAllImages() {
    startBtn.innerText = "잠깐, 준비 중...";
    startBtn.style.opacity = "0.6";
    startBtn.disabled = true;

    const criticalUrls = [];
    questions.forEach(q => criticalUrls.push(q.img));
    criticalUrls.push("assets/main_image.png", "assets/book.png", "assets/book2.png", "assets/header.png");

    let loadedCount = 0;
    const total = criticalUrls.length;

    criticalUrls.forEach(url => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loadedCount++;
            if (loadedCount === total) {
                imagesLoaded = true;
                startBtn.innerText = "테스트 시작하기";
                startBtn.style.opacity = "1";
                startBtn.disabled = false;
                preloadResultImages();
            }
        };
        img.src = url;
    });
}

function preloadResultImages() {
    Object.values(results).forEach(r => {
        const img = new Image();
        img.src = r.img;
    });
}

preloadAllImages();

startBtn.addEventListener("click", startTest);
document.getElementById("restart-btn").addEventListener("click", () => location.reload());
document.getElementById("share-btn").addEventListener("click", shareResult);
document.getElementById("other-types-btn").addEventListener("click", openModal);
backBtn.addEventListener("click", goBack);

// 모달 닫기 버튼 이벤트 바인딩 (이전 답변에서 누락되었던 부분 추가)
const modalCloseBtn = document.getElementById("modal-close-btn");
if(modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
}

document.getElementById("other-modal").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
});

function scrollTop(el) {
    try { el.scrollTo(0, 0); } catch(e) {}
}

function switchScreen(fromEl, toEl, afterFn) {
    fromEl.style.animation = "fadeOutDown 0.25s ease forwards";
    setTimeout(() => {
        fromEl.classList.remove("active");
        fromEl.style.animation = "";
        toEl.classList.add("active");
        scrollTop(toEl);
        if (afterFn) afterFn();
    }, 250);
}

function startTest() {
    if (!imagesLoaded) return;
    currentQuestion = 0;
    scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    historyLog = [];
    switchScreen(mainScreen, qScreen, () => {
        renderNextQuestion();
    });
}

function renderNextQuestion() {
    const qData = questions[currentQuestion];

    document.getElementById("current-q").innerText = currentQuestion + 1;
    const pct = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = pct + "%";

    const imgPreloader = new Image();
    imgPreloader.onload = imgPreloader.onerror = () => {
        document.getElementById("question-text").innerHTML = qData.q;

        const qImg = document.getElementById("q-image");
        qImg.src = qData.img;

        const btns = document.querySelectorAll(".btn-option");
        btns[0].innerHTML = qData.options[0].text;
        
        // click 이벤트가 계속 쌓이는 것을 방지
        btns[0].onclick = () => selectOption(qData.options[0].type);
        btns[1].innerHTML = qData.options[1].text;
        btns[1].onclick = () => selectOption(qData.options[1].type);

        backBtn.classList.remove("hidden");
        qContent.className = "q-content-box fade-in-up";
    };
    imgPreloader.src = qData.img;
}

function selectOption(type) {
    historyLog.push(type);
    scores[type]++;
    currentQuestion++;

    qContent.className = "q-content-box fade-out-down";

    setTimeout(() => {
        if (currentQuestion >= questions.length) {
            showLoading();
            return;
        }
        scrollTop(qScreen);
        qContent.className = "q-content-box is-hidden";
        renderNextQuestion();
    }, 250);
}

function goBack() {
    if (currentQuestion === 0) {
        switchScreen(qScreen, mainScreen);
        return;
    }
    const lastType = historyLog.pop();
    scores[lastType]--;
    currentQuestion--;

    qContent.className = "q-content-box fade-out-down";
    setTimeout(() => {
        scrollTop(qScreen);
        qContent.className = "q-content-box is-hidden";
        renderNextQuestion();
    }, 250);
}

function showLoading() {
    switchScreen(qScreen, loadingScreen, () => {
        const textEl = document.getElementById("loading-msg");
        let msgIdx = 0;
        if(textEl) textEl.innerText = loadingMessages[msgIdx];

        const msgInterval = setInterval(() => {
            msgIdx = (msgIdx + 1) % loadingMessages.length;
            if(textEl) {
                textEl.style.opacity = "0";
                setTimeout(() => {
                    textEl.innerText = loadingMessages[msgIdx];
                    textEl.style.opacity = "1";
                }, 200);
            }
        }, 900);

        document.getElementById("progress-bar").style.width = "100%";

        setTimeout(() => {
            clearInterval(msgInterval);
            calculateResult();
        }, 3000);
    });
}

// 🌟 Firebase에 결과를 저장하는 비동기 함수 추가
async function calculateResult() {
    if (document.activeElement) document.activeElement.blur();

    const type1    = scores.A >= scores.B ? "A" : "B";
    const type2    = scores.C >= scores.D ? "C" : "D";
    const type3    = scores.E >= scores.F ? "E" : "F";
    const finalType = type1 + type2 + type3;

    // 파이어베이스에 결과 전송 시도
    saveResultToFirebase(finalType);

    switchScreen(loadingScreen, resultScreen, () => {
        displayResult(finalType);
        renderOtherTypes();
    });
}

// 🌟 Firebase 전송 로직
async function saveResultToFirebase(typeCode) {
    try {
        const statDocRef = doc(db, "stats", "typeCounts");
        const docSnap = await getDoc(statDocRef);

        if (docSnap.exists()) {
            await updateDoc(statDocRef, {
                [typeCode]: increment(1)
            });
        } else {
            const initialData = {
                "ACE": 0, "ACF": 0, "ADE": 0, "ADF": 0, 
                "BCE": 0, "BCF": 0, "BDE": 0, "BDF": 0
            };
            initialData[typeCode] = 1;
            await setDoc(statDocRef, initialData);
        }
        console.log("결과 저장 성공!");
    } catch (e) {
        console.error("결과 저장 실패: ", e);
    }
}

function displayResult(typeKey) {
    const resData = results[typeKey];
    if (!resData) return;
    document.getElementById("result-title").innerHTML    = resData.title;
    document.getElementById("result-desc").innerHTML     = resData.desc;
    document.getElementById("result-solution").innerHTML = resData.solution;
    document.getElementById("result-image").src          = resData.img;
    scrollTop(resultScreen);
}

// 모달창에서 다른 유형 선택 시 결과를 그려주는 헬퍼 함수
window.selectOtherType = function(typeKey) {
    closeModal();
    displayResult(typeKey);
}

function renderOtherTypes() {
    const grid = document.getElementById("types-grid");
    grid.innerHTML = "";
    for (const [key, val] of Object.entries(results)) {
        grid.innerHTML += `
            <div class="type-card" onclick="selectOtherType('${key}')">
                <img src="${val.img}" alt="${val.title}" loading="lazy">
                <p>${val.title}</p>
                <span class="type-badge">결과 보기 &rsaquo;</span>
            </div>`;
    }
}

function openModal()  { document.getElementById("other-modal").classList.remove("hidden"); }
function closeModal() { document.getElementById("other-modal").classList.add("hidden"); }

function shareResult() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: '나의 선 긋기 유형',
            text: '나의 직장생활 멘탈 보호 유형을 확인해보세요!',
            url
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(url)
            .then(() => alert("링크가 복사됐어요! 어디든 붙여 넣어 공유하세요 😊"))
            .catch(() => {
                prompt("아래 링크를 복사하세요:", url);
            });
    }
}

const footerLogo = document.querySelector('.app-footer img');
let logoClickCount = 0;
let logoClickTimer;
if (footerLogo) {
    footerLogo.addEventListener('click', () => {
        logoClickCount++;
        if (logoClickCount >= 5) window.location.href = 'admin.html';
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 2000);
    });
}

window.addEventListener('wheel', (e) => {
    if (document.querySelector('.app-container').contains(e.target)) return;
    const activeScreen = document.querySelector('.screen.active');
    if (!activeScreen) return;
    if (activeScreen.classList.contains('smore-main')) return;

    e.preventDefault();
    activeScreen.scrollBy({ top: e.deltaY, behavior: 'auto' });
}, { passive: false });
