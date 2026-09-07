const questions = [
    {
        q: "선 넘는 질문('연봉 얼마 받아요?')을 받는다면?",
        img: "assets/q001.png",
        options: [
            { text: "그게 왜 궁금한데요? 라며 불쾌함을 표현한다.", type: "A" },
            { text: "요즘 그 연차 평균 연봉이 어떻게 되죠? 라며 말을 돌린다.", type: "B" }
        ]
    },
    {
        q: "상대가 나에게 언성을 높이며 불만을 쏟아낸다면?",
        img: "assets/q002.png",
        options: [
            { text: "제가 잘못했다는 건가요? 충동적으로 맞받아친다.", type: "A" },
            { text: "우선 자리를 옮기실까요? 감정의 흐름을 정돈한다.", type: "B" }
        ]
    },
    {
        q: "지각을 밥 먹듯 하는 후배에게 쓴소리를 한다면?",
        img: "assets/q003.png",
        options: [
            { text: "n번이나 늦으셨어요. 시간 지켜주세요. 사실을 짚는다.", type: "A" },
            { text: "자꾸 늦으시니 조금 걱정돼요. 내 감정을 전한다.", type: "B" }
        ]
    },
    {
        q: "업무 방향을 두고 의견이 갈린다면?",
        img: "assets/q004.png",
        options: [
            { text: "누구의 논리가 현실적이고 합리적인지 따져본다.", type: "A" },
            { text: "어떤 경험으로 그런 생각을 하게 됐나요? 배경을 묻는다.", type: "B" }
        ]
    },
    {
        q: "상사가 '오늘 술 한잔하자'며 곤란한 부탁을 한다면?",
        img: "assets/q005.png",
        options: [
            { text: "내키지 않아도 일단 나가는 게 사회생활이다.", type: "C" },
            { text: "오늘은 일이 있지만 다음 주는 괜찮습니다. 일정을 제안한다.", type: "D" }
        ]
    },
    {
        q: "회의 중 두 가지 시안을 골라야 한다면?",
        img: "assets/q006.png",
        options: [
            { text: "보통 B가 더 낫다고들 하네요. 주어를 뺀다.", type: "C" },
            { text: "저는 A보단 B가 괜찮아 보이네요. 나를 주어로 쓴다.", type: "D" }
        ]
    },
    {
        q: "누군가 나를 칭찬한다면?",
        img: "assets/q007.png",
        options: [
            { text: "과찬이세요. 반사적으로 부정한다.", type: "C" },
            { text: "과장님도 오늘 멋지신데요? 칭찬을 되돌려준다.", type: "D" }
        ]
    },
    {
        q: "메시지를 보냈는데 n시간째 안 읽는다면?",
        img: "assets/q008.png",
        options: [
            { text: "내가 뭐 실수했나? 불안해서 덧붙일 말을 찾는다.", type: "C" },
            { text: "아무것도 안 하는 것도 방법이니 그냥 기다린다.", type: "D" }
        ]
    },
    {
        q: "다른 팀에 부탁할 일이 생긴다면?",
        img: "assets/q009.png",
        options: [
            { text: "이거 어렵지 않은 부탁입니다. 금방 끝나요! 장점만 어필.", type: "E" },
            { text: "조금 번거로우실 텐데, 도와주시면 감사하겠습니다. 불편함 인정.", type: "F" }
        ]
    },
    {
        q: "타인이 상식에 어긋나는 행동을 할때 드는 생각은?",
        img: "assets/q010.png",
        options: [
            { text: "그건 상식적으로 틀린 행동이지. 도덕적인 관점으로 판단한다.", type: "E" },
            { text: "내 가치관으로는 그 행동이 좀 불편하네. 개인의 가치관으로 판단한다.", type: "F" }
        ]
    },
    {
        q: "내 의견을 강하게 주장해야 한다면?",
        img: "assets/q011.png",
        options: [
            { text: "이게 확실히 맞습니다. 흔들림 없이 말한다.", type: "E" },
            { text: "의견이 다를 수도 있지만, 제 생각은~ 이라며 여지를 둔다.", type: "F" }
        ]
    },
    {
        q: "인사를 건넨 상사의 표정이 굳어 있을때 드는 생각은?",
        img: "assets/q012.png",
        options: [
            { text: "내 기획안이 맘에 안 들었나? 복잡한 이유들이 떠오른다.", type: "E" },
            { text: "어제 잠을 못 잤나? 단순한 이유를 떠올린다.", type: "F" }
        ]
    }
];

const results = {
    "ACE": { 
        img: "assets/a001.png",
        title: "속앓이 팩트체커", 
        desc: "겉으론 네네~ 속으론 논리 반박 엑셀표 돌리는 중\n\n최근에 속으로 '아니 그게 상식적으로 말이 되나?'라고 수백 번 외친 적 있지 않으신가요? 겉으로는 무례한 상황에서도 조용히 고개를 끄덕이지만, 머릿속에서는 이미 상대의 논리적 오류를 지적하는 팩트체크가 끝났습니다.\n\n퇴근길 카톡방에서 친구들에게 폭풍 사이다를 쏟아내는 당신! 가끔은 그 날카로운 팩트를 현실에서도 슬쩍 꺼내어 내 멘탈을 지켜보는 건 어떨까요?", 
        solution: "'복잡하게 생각하는 것이 깊이 생각하는 것처럼 느껴질 때가 있다. 하지만 많은 경우 그것은 깊이가 아니라 혼란이다. 판단력은 더 많이 덧붙이는 능력이 아니라, 필요 없는 것을 덜어내는 능력에 가깝다.' (p.114)" 
    },
    "ACF": { 
        img: "assets/a002.png",
        title: "소심한 솔로몬", 
        desc: "내 마음속 재판장에선 이미 넌 유죄야\n\n선 넘는 말을 들었을 때, 대놓고 화내진 못하고 '아.. 네..' 하며 어색하게 웃어넘긴 적 있으시죠? 평화를 사랑해서 갈등은 피하고 싶지만, 나만의 확고한 가치관 레이더에는 상대방의 무례함을 다 포착하고 있습니다.\n\n분위기 깰까 봐 꾹 참다가 자기 전 침대에서 '아까 이렇게 받아칠 걸!!' 하고 이불킥하는 당신. 조금은 이기적이 되어도 괜찮을 것 같아요!", 
        solution: "주어가 분명한 말에는 그 사람이 어떤 기준으로 생각하고 판단하는지가 담긴다. 그리고 상대는 단순한 정보보다 그 말 안에 담긴 화자의 태도와 관점을 기억한다. 결국 오래 남는 말은 완벽한 표현이 아니라, 말하는 사람이 느껴지는 말이다. (p.161)" 
    },
    "ADE": { 
        img: "assets/a003.png",
        title: "브레이크 고장난 불도저", 
        desc: "할 말은 해야 직성이 풀리는 오피스 사이다\n\n최근 답답하게 일하거나 선 넘는 동료를 보며 '내가 하고 말지'라며 키보드 샷건을 칠 뻔한 당신! 빙빙 돌려 말하는 건 딱 질색, 눈치 보며 참느니 팩트로 꽂아버리는 직진 스타일입니다.\n\n하루에도 몇 번씩 '저 사람은 왜 저렇게 일하지?'라는 생각이 스쳐 지나가죠. 업무 효율은 최고지만, 때로는 그 솔직함이 나를 더 피곤한 논쟁으로 끌고 갈 수 있으니 한 템포 쉬어가는 브레이크도 필요해요.", 
        solution: "잠깐의 완충은 이후 대화를 전혀 다른 방향으로 이끈다.\n\n감정이 격해질수록 말은 짧아져야 하고, 그 짧은 말 중 가장 실용적으로 쓸 수 있다. (p.90, 91)" 
    },
    "ADF": { 
        img: "assets/a004.png",
        title: "외유내강 팩트폭격기", 
        desc: "웃으며 뼈 때리기 기사 자격증 보유자\n\n당신은 모르겠지만, 동료들 사이에서 당신은 '저 사람 진짜 똑똑하게 화낸다'는 평가를 받고 계실 거예요. 무례한 상사의 압박에도 절대 감정적으로 흔들리지 않고, 은은한 미소와 함께 논리적으로 할 말은 다 하는 진정한 오피스 고수인 당신.\n\n겉보기엔 부드럽고 유연해 보이지만, 속에는 절대 부러지지 않는 강철 심지가 박혀 있네요. 누군가는 남몰래 당신을 오피스 롤모델로 삼고 있을지도 몰라요!", 
        solution: "사람은 평가와 비난을 먼저 들으면 쉽게 방어적으로 반응하지만, 감정과 욕구를 먼저 들으면 상대의 상태를 이해하게 된다.\n\n그래서 같은 문제를 말해도 표현 방식에 따라 대화의 흐름은 크게 달라진다. 감정을 먼저 꺼내면 상대는 맞고 틀림을 따지기보다, 우선 내 상태를 듣게 된다. (p.167)" 
    },
    "BCE": { 
        img: "assets/a005.png",
        title: "유리멘탈 평화주의자", 
        desc: "남의 기분 챙기다 내 속만 시커멓게 타들어감\n\n'그냥 내가 참자' 하고 남몰래 깊은 한숨 쉰 적이 많으시죠? 다른 사람 기분 상할까 봐 싫은 소리 한마디 못 하고, 칭찬을 들어도 부담스러워 어쩔 줄 모르는 당신.\n\n퇴근 후에도 '아까 내가 한 말 때문에 그 사람 기분 상했으려나?' 하고 끝없는 시뮬레이션을 돌리고 있네요. 이제 남 챙기느라 정작 멍들고 있는 '내 멘탈'부터 꼭 안아줄 시간이 왔습니다.", 
        solution: "늘 좋은 사람처럼 보이기 위해 자기 감정을 억누르는 것은 오히려 관계를 불안정하게 만들 수 있다. 성숙하게 착한 사람은 친절을 베풀더라도 자신을 지우지 않는다. (p.184)" 
    },
    "BCF": { 
        img: "assets/a006.png",
        title: "눈치백단 예스맨", 
        desc: "인간 레이더망 가동! 분위기 싸해지는 건 딱 질색\n\n회사에서 '저 사람 오늘 기분 안 좋아 보이는데?'를 가장 먼저 캐치하는 눈치 천재 아니신가요? 어색하거나 불편한 상황을 견디지 못해, 곤란한 부탁도 '제가 할게요!'라며 떠안은 적이 한두 번이 아닐 겁니다.\n\n사회생활 만렙에 주변 평판은 최고지만, 모두를 만족시키려다 내 에너지는 이미 방전 직전이네요. 가끔은 '모르쇠'로 일관하며 나를 위한 퇴근을 사수해 보세요!", 
        solution: "사람은 완벽하게 포장된 말보다 현실적인 말을 더 믿는다. 그리고 그 현실을 담담하게 인정할 줄 아는 사람이 결국 더 신뢰받는다. (p.165)" 
    },
    "BDE": { 
        img: "assets/a007.png",
        title: "단호박 스펀지", 
        desc: "절대 호구 안 당함! 웃으며 내 몫 다 챙기는 실속파\n\n스트레스받는 상황에서도 유연하게 대처하며 절대 호구 잡히지 않는 당신! '아유~ 부장님 그건 좀 힘들 것 같아요^o^' 라며 기분 나쁘지 않게 내 선을 완벽하게 지켜내는 타입입니다.\n\n상대방의 감정은 적당히 스펀지처럼 흡수해 주면서도, 부당한 요구는 단호박처럼 잘라내는 스킬이 예술이네요. 당신은 감정 소모는 최소화하고 챙길 건 다 챙기는 진정한 의미의 스마트한 직장인입니다!", 
        solution: "중요한 것은 선을 넘는 질문에 반드시 성실하게 답해야 한다는 압박에서 벗어나는 것이다. 대화에서 경계를 지키는 것은 까다로운 태도가 아니다. 자신을 지키는 방식이다. (p.87)" 
    },
    "BDF": { 
        img: "assets/a008.png",
        title: "마음 해독 마스터", 
        desc: "멘탈 방어력 만렙! 모두의 워너비\n\n주변에서 '너랑 얘기하면 마음이 편해'라는 소리를 들어본적 있지 않으세요?\n\n당신은 상대방의 숨은 의도와 감정까지 찰떡같이 읽어내면서도, 나만의 경계선은 명확하고 부드럽게 지켜냅니다. 선 넘는 질문을 받아도 당황하지 않고 '그렇게 생각하실 수도 있겠네요'라며 물 흐르듯 넘겨버리는 멘탈 방어력의 소유자! 웬만한 자극에는 끄떡없는 가장 이상적인 커뮤니케이터입니다.", 
        solution: "논리보다 강한 것은 태도다. 그리고 틀릴 수 있음을 인정하는 태도는 어떤 논리보다 사람의 마음을 더 쉽게 연다. (p.67)" 
    }
};

let currentQuestion = 0;
let scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

const mainScreen = document.getElementById("main-screen");
const qScreen = document.getElementById("question-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultScreen = document.getElementById("result-screen");

document.getElementById("start-btn").addEventListener("click", startTest);
document.getElementById("restart-btn").addEventListener("click", () => location.reload());
document.getElementById("share-btn").addEventListener("click", shareResult);

function startTest() {
    mainScreen.classList.remove("active");
    qScreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showLoading();
        return;
    }

    const qData = questions[currentQuestion];
    document.getElementById("current-q").innerText = currentQuestion + 1;
    document.getElementById("progress-bar").style.width = ((currentQuestion + 1) / questions.length * 100) + "%";
    
    document.getElementById("question-text").innerText = qData.q;
    document.getElementById("q-image").src = qData.img;

    const btns = document.querySelectorAll(".btn-option");
    btns[0].innerText = qData.options[0].text;
    btns[0].onclick = () => selectOption(qData.options[0].type);
    
    btns[1].innerText = qData.options[1].text;
    btns[1].onclick = () => selectOption(qData.options[1].type);
}

function selectOption(type) {
    scores[type]++;
    currentQuestion++;
    showQuestion();
}

function showLoading() {
    qScreen.classList.remove("active");
    loadingScreen.classList.add("active");
    setTimeout(calculateResult, 1500);
}

function calculateResult() {
    const type1 = scores.A > scores.B ? "A" : "B";
    const type2 = scores.C > scores.D ? "C" : "D";
    const type3 = scores.E > scores.F ? "E" : "F";
    
    const finalType = type1 + type2 + type3;
    const resData = results[finalType];

    loadingScreen.classList.remove("active");
    resultScreen.classList.add("active");

    document.getElementById("result-title").innerText = resData.title;
    document.getElementById("result-desc").innerText = resData.desc;
    document.getElementById("result-solution").innerText = resData.solution;
    
    document.getElementById("result-image").src = resData.img;
}

function shareResult() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: '나의 선 긋기 유형',
            text: '나의 직장생활 멘탈 보호 유형을 확인해보세요!',
            url: url
        });
    } else {
        alert("링크가 복사되었습니다.");
        navigator.clipboard.writeText(url);
    }
}
