// =============================================================
// 프로젝트 데이터 (인수인계 목록 기준 · 링크 허브형 간소 카드)
// 다음 작업자는 이 파일만 수정하면 됩니다.
// - url: null 인 항목은 버튼이 표시되지 않습니다. URL을 넣으면 자동 활성화됩니다.
// - status: '반영 완료' | '디자인 완료' | '홀딩' | '확인 필요'  (secondaryStatus: 보조 배지)
// - pendingLinks: URL 미확인 자료의 비활성 버튼 라벨 (URL 확인 시 해당 필드에 입력 후 삭제)
// - checkNeeded: 실제 후속 확인이 필요한 항목만 1~2줄 (없으면 빈 배열)
// - docs / pdfDocument: 실제 정책·가이드 문서가 있는 프로젝트에만 사용
// - 번호를 재정렬할 때는 id / number / linkedProject.id / PENDING_INPUTS 문구를 함께 수정하세요.
// =============================================================

window.PROJECTS = [
  {
    id: 'p01',
    number: 'P01',
    title: '에누리 만보기 서비스 전환',
    status: '디자인 완료',
    secondaryStatus: null,
    platforms: ['MW', 'APP'],
    period: null,
    referenceDate: '2026.08.13',
    prototypeUrl: 'https://emoney-pedometer-proto.vercel.app/',
    figmaUrl: 'https://www.figma.com/design/xurE5oN4s7GK4J98gtAQVI/260810_%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%A0%81%EB%A6%BD_%EB%A7%8C%EB%B3%B4%EA%B8%B0?node-id=19-194&t=T3BdW8phBHrhdyBS-1',
    figmaLabel: null,
    taskUrls: [
      { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2799/' }
    ],
    docs: [],
    pdfDocument: null,
    subtitle: null,
    subWorkLine: null,
    scopeLines: null,
    linkedProject: null,
    relatedWork: null,
    pendingLinks: [],
    checkNeeded: [
      '개발 반영·QA 범위 최종 확인 필요'
    ]
  },
  {
    id: 'p02',
    number: 'P02',
    title: '원부상세 통합 플로팅 구좌 신설',
    status: '반영 완료',
    secondaryStatus: null,
    platforms: ['MW'],
    period: null,
    referenceDate: null,
    prototypeUrl: 'https://fab-motion-prototype.vercel.app/',
    figmaUrl: 'https://www.figma.com/design/Nr9Zxq4CciQ8dVKB2h944F/-%EB%AA%A8%EB%B0%94%EC%9D%BC--%EC%9B%90%EB%B6%80%EC%83%81%EC%84%B8-%ED%86%B5%ED%95%A9-%ED%94%8C%EB%A1%9C%ED%8C%85-%EA%B5%AC%EC%A2%8C?node-id=0-1&t=uGwXexnS4Dh62754-1',
    figmaLabel: null,
    taskUrls: [
      { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2785/' }
    ],
    docs: [],
    pdfDocument: null,
    subtitle: null,
    subWorkLine: null,
    scopeLines: null,
    linkedProject: null,
    relatedWork: null,
    pendingLinks: [],
    checkNeeded: []
  },
  {
    // 기존 P03(홈 하단 탭바 학원 진입 UX 검토) + P04(모바일 홈 상단 고정 탭바) 통합
    id: 'p03',
    number: 'P03',
    title: '하단 탭바 개편 (학원 탭 신설 · 혜택 GNB 이동)',
    status: '디자인 완료',
    secondaryStatus: '확인 필요',
    statusNote: '로고 변경 완료',
    platforms: ['MW', 'APP', '홈'],
    period: null,
    referenceDate: null,
    prototypeUrl: 'https://academy-bottom-navigation-review.vercel.app/',
    figmaUrl: 'https://www.figma.com/design/Q1Mh54bEwAB2drsFB6XdAq/%ED%99%88%EB%A9%94%EC%9D%B8_%ED%95%98%EB%8B%A8%ED%83%AD%EB%B0%94--%EC%83%81%EB%8B%A8%EA%B2%80%EC%83%89%EC%B0%BD_%ED%95%99%EC%9B%90%EC%84%9C%EB%B9%84%EC%8A%A4%EC%B6%94%EA%B0%80?node-id=0-1&t=SuCiHymOeibRrH9h-1',
    figmaLabel: 'Figma',
    taskUrls: [
      { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2790/' }
    ],
    docs: [],
    pdfDocument: null,
    subtitle: null,
    subWorkLine: null,
    scopeLines: [
      '모바일 홈 상단 고정 헤더 및 검색/Utility 구조 개선',
      '하단 탭바 개편 및 학원 서비스 진입 구조 개선',
      '모바일 홈 상·하단 내비게이션을 하나의 IA 개선 업무로 정리'
    ],
    linkedProject: null,
    relatedWork: {
      title: '하단 탭바 개편 및 메뉴 구조 개선',
      status: '반영 완료',
      platforms: ['MW', 'APP', '홈'],
      figmaUrl: 'https://www.figma.com/design/wLdj7HOG9N1wj5bwExk910/260526_%ED%99%88-%EC%9D%B8%EB%B2%A4%ED%86%A0%EB%A6%AC-%EB%B6%80%EB%B6%84-%EA%B0%9C%EC%84%A0?node-id=83-8332&t=JAH2DUqwiUwkMZn2-1',
      taskUrls: [
        { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2660/' }
      ]
    },
    pendingLinks: [],
    checkNeeded: [
      '상단 고정 탭바 최종 반영 상태 확인 필요'
    ]
  },
  {
    id: 'p04',
    number: 'P04',
    title: '관심상품 버튼 상태 및 인터랙션 개선',
    status: '반영 완료',
    secondaryStatus: null,
    platforms: ['PC', 'MW', 'APP'],
    period: null,
    referenceDate: null,
    prototypeUrl: null,
    figmaUrl: 'https://www.figma.com/design/WYQFE1qv0VtdbxjoKQlKi4/260318_%EA%B5%AC%EB%8F%85-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B0%9C%EC%84%A0-Ph1-?node-id=1020-9770&t=qlKedxXNlV7ocVfk-1',
    figmaLabel: null,
    taskUrls: [
      { label: '일감 모바일', url: 'https://project.cowave.kr/enuri/browse/FRONT-2400/' },
      { label: '일감 PC', url: 'https://project.cowave.kr/enuri/browse/FRONT-2513/' }
    ],
    docs: [],
    pdfDocument: null,
    subtitle: null,
    subWorkLine: null,
    scopeLines: null,
    linkedProject: { id: 'p05', label: '연결 업무' },
    relatedWork: null,
    pendingLinks: [], // 아이콘 변경건은 기존 디자인 가이드에 적용 후 별도 정리 — 위치 확인 시 URL 연결
    checkNeeded: []
  },
  {
    id: 'p05',
    number: 'P05',
    title: '관심상품 페이지 UX 개선(구독 서비스 개선 Ph1)',
    status: '디자인 완료',
    secondaryStatus: '보류',
    platforms: ['MW', 'APP'],
    period: null,
    referenceDate: null,
    prototypeUrl: null,
    figmaUrl: 'https://www.figma.com/design/WYQFE1qv0VtdbxjoKQlKi4/260318_%EA%B5%AC%EB%8F%85-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B0%9C%EC%84%A0-Ph1-?node-id=0-1&t=HQAzhZegx9uDtSn4-1',
    figmaLabel: null,
    taskUrls: [
      { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2580/' }
    ],
    // 연결 일감: 메인 일감과 병렬로 노출하지 않는 보조 일감 링크
    relatedTask: { label: 'FRONT-2390', url: 'https://project.cowave.kr/enuri/browse/FRONT-2390/' },
    docs: [],
    pdfDocument: {
      title: '가격알림·가격그래프 UX 정책',
      file: 'public/docs/price-alert-graph-ux-policy.pdf',
      format: 'PDF',
      pages: '12페이지',
      author: '한일환',
      summary: '가격알림 목표가 입력·하락률 슬라이더·저장·재진입·예외 처리와 가격추이 그래프의 기간 탭·현재 라벨·터치/드래그·관심 등록일 포인트 기준을 정리한 UX 정책 문서'
    },
    subtitle: null,
    subWorkLine: null,
    scopeLines: null,
    linkedProject: { id: 'p04', label: '연결 업무', status: '반영 완료' },
    relatedWork: null,
    pendingLinks: [],
    checkNeeded: [
      '홀딩 상태 — 재개 시 최신 요구사항 및 개발 범위 확인',
      'Prototype 확인 필요'
    ]
  },
  {
    id: 'p06',
    number: 'P06',
    title: '홈 인벤토리 부분 개선 — 쇼핑제안',
    status: '반영 완료',
    secondaryStatus: null,
    platforms: ['모바일 홈'],
    period: null,
    referenceDate: null,
    prototypeUrl: null,
    figmaUrl: 'https://www.figma.com/design/qayQtrYUp63trv6r79zAPy/%EC%87%BC%ED%95%91%EC%A0%9C%EC%95%88---ai%EB%B1%83%EC%A7%80?node-id=0-1&t=57EF99lH1dLPks17-1',
    figmaLabel: null,
    taskUrls: [
      { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2674/' }
    ],
    docs: [],
    pdfDocument: null,
    subtitle: null,
    subWorkLine: null,
    scopeLines: null,
    linkedProject: null,
    relatedWork: null,
    pendingLinks: [],
    checkNeeded: []
  },
  {
    id: 'p07',
    number: 'P07',
    title: '리워드 쇼핑혜택 페이지 UX/UI 개선',
    status: '반영 완료',
    secondaryStatus: null,
    platforms: ['MW', 'APP'],
    period: null,
    referenceDate: null,
    prototypeUrl: null,
    figmaUrl: 'https://www.figma.com/design/xB0pUooeZ4SyRHNFYYXdS4/260716_%EC%98%A4%ED%8D%BC%EC%9B%94-%EC%A7%84%EC%9E%85%EC%A0%90%EA%B0%9C%EC%84%A0?node-id=168-100&p=f',
    figmaLabel: null,
    taskUrls: [
      { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2285/' }
    ],
    docs: [],
    pdfDocument: null,
    subtitle: null,
    subWorkLine: null,
    scopeLines: null,
    linkedProject: null,
    // 연결 업무: 메인 카드 하단의 서브 카드로만 표시 (독립 프로젝트 아님)
    // sameFigma: true → "P07과 동일한 Figma 파일 사용" 문구가 메인 번호 기준으로 자동 표시됨
    relatedWork: {
      title: '에누리 오퍼월 진입점 개선',
      platforms: ['APP'],
      taskUrls: [
        { label: '일감', url: 'https://project.cowave.kr/enuri/browse/FRONT-2758/' }
      ],
      sameFigma: true
    },
    pendingLinks: [],
    checkNeeded: []
  }
];

// 문서 사용 기준 (상단 안내 박스)
window.USAGE_GUIDE = {
  title: '문서 사용 기준 — 프로젝트별 최신 기준 확인 순서',
  steps: [
    '최신 일감 코멘트 및 상태',
    '최신 Figma 프레임',
    '관련 PRD·정책·가이드 문서',
    'Prototype',
    '실제 운영 화면'
  ],
  note: 'Prototype은 인터랙션 확인용으로 사용하고, 최종 시각 디자인 기준은 Figma를 우선 확인.'
};

// 추가 입력이 필요한 항목 (하단 체크리스트)
window.PENDING_INPUTS = [
  'P03 상단 고정 탭바 Figma / 일감',
  'P04 관심상품 버튼 최종 디자인 가이드 위치',
  'P05 관심상품 페이지 Prototype'
];
