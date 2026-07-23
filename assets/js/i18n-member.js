/* 會員／帳戶頁的結構性 UI 文案翻譯字典（前台切版時以英文烘焙、未走 data-i18n）。
   以「英文原文（去頭尾空白後）→ {zh,ko,th}」精確比對，由 site.js applyI18n 的
   文字節點 pass 依當前語系替換；en 不在此表（保留烘焙英文）。
   刻意只收結構性 UI（表頭/標籤/按鈕/狀態/區塊標題/表單），不收專有名詞
   （遊戲/供應商/球隊/玩家名）、假資料（交易編號、N playing、賠率、賽程時間）、
   以及 About/FAQ 長篇條款。 */
;(function () {
  var M = {
    /* ── 帳戶總覽 ───────────────────────────── */
    'Quick Actions': { zh: '快速操作', ko: '빠른 작업', th: 'การดำเนินการด่วน' },
    'Recent Transactions': { zh: '最近交易', ko: '최근 거래', th: 'ธุรกรรมล่าสุด' },
    'View More Records →': { zh: '查看更多紀錄 →', ko: '더 많은 기록 보기 →', th: 'ดูบันทึกเพิ่มเติม →' },
    'Rollover': { zh: '流水', ko: '롤오버', th: 'ยอดหมุนเวียน' },
    'Rollover left': { zh: '剩餘流水', ko: '남은 롤오버', th: 'ยอดหมุนเวียนคงเหลือ' },
    'Remaining Turnover Amount:': { zh: '剩餘流水金額：', ko: '남은 턴오버 금액:', th: 'ยอดเทิร์นโอเวอร์คงเหลือ:' },
    'Central Wallet:': { zh: '中央錢包：', ko: '중앙 지갑:', th: 'กระเป๋ากลาง:' },
    'Available Amount:': { zh: '可用金額：', ko: '사용 가능 금액:', th: 'จำนวนที่ใช้ได้:' },
    'Rewards': { zh: '獎勵', ko: '리워드', th: 'รางวัล' },
    'Nickname：': { zh: '暱稱：', ko: '닉네임:', th: 'ชื่อเล่น:' },
    'Current:': { zh: '目前：', ko: '현재:', th: 'ปัจจุบัน:' },
    'Next:': { zh: '下一級：', ko: '다음:', th: 'ถัดไป:' },
    'Total Deposit Amount': { zh: '總存款金額', ko: '총 입금액', th: 'ยอดฝากรวม' },
    'Total Withdrawal Amount': { zh: '總提款金額', ko: '총 출금액', th: 'ยอดถอนรวม' },
    'Total P&L': { zh: '總損益', ko: '총 손익', th: 'กำไรขาดทุนรวม' },
    'Account Management': { zh: '帳戶管理', ko: '계정 관리', th: 'การจัดการบัญชี' },

    /* ── 銀行／錢包 ─────────────────────────── */
    '+ Add New Bank Account': { zh: '+ 新增銀行帳戶', ko: '+ 새 은행 계좌 추가', th: '+ เพิ่มบัญชีธนาคารใหม่' },
    'Crypto Wallet': { zh: '加密錢包', ko: '암호화폐 지갑', th: 'กระเป๋าคริปโต' },
    'Add wallet': { zh: '新增錢包', ko: '지갑 추가', th: 'เพิ่มกระเป๋า' },
    'Empty wallet list': { zh: '尚無錢包', ko: '지갑이 없습니다', th: 'ยังไม่มีกระเป๋า' },
    'Bank Name': { zh: '銀行名稱', ko: '은행명', th: 'ชื่อธนาคาร' },
    'Bank Card': { zh: '銀行卡', ko: '은행 카드', th: 'บัตรธนาคาร' },
    'Wallet Address:': { zh: '錢包地址：', ko: '지갑 주소:', th: 'ที่อยู่กระเป๋า:' },
    'Wallet Type:': { zh: '錢包類型：', ko: '지갑 유형:', th: 'ประเภทกระเป๋า:' },
    'Please select wallet type': { zh: '請選擇錢包類型', ko: '지갑 유형을 선택하세요', th: 'โปรดเลือกประเภทกระเป๋า' },

    /* ── 紀錄頁表頭／控制 ───────────────────── */
    'Transaction Type': { zh: '交易類型', ko: '거래 유형', th: 'ประเภทธุรกรรม' },
    'Transaction Amount': { zh: '交易金額', ko: '거래 금액', th: 'จำนวนธุรกรรม' },
    'Transaction No.': { zh: '交易編號', ko: '거래 번호', th: 'เลขที่ธุรกรรม' },
    'Current Balance': { zh: '目前餘額', ko: '현재 잔액', th: 'ยอดคงเหลือปัจจุบัน' },
    'Order No': { zh: '訂單編號', ko: '주문 번호', th: 'เลขที่ออเดอร์' },
    'Settlement Time': { zh: '結算時間', ko: '정산 시간', th: 'เวลาชำระ' },
    'Bet Amount': { zh: '投注金額', ko: '베팅 금액', th: 'จำนวนเดิมพัน' },
    'Valid Bet': { zh: '有效投注', ko: '유효 베팅', th: 'เดิมพันที่ถูกต้อง' },
    'Winnings': { zh: '派彩', ko: '당첨금', th: 'เงินรางวัล' },
    'Bet P&L': { zh: '投注損益', ko: '베팅 손익', th: 'กำไรขาดทุนเดิมพัน' },
    'Date Time': { zh: '日期時間', ko: '날짜/시간', th: 'วันเวลา' },
    'Date': { zh: '日期', ko: '날짜', th: 'วันที่' },
    'Time': { zh: '時間', ko: '시간', th: 'เวลา' },
    'Status': { zh: '狀態', ko: '상태', th: 'สถานะ' },
    'Type': { zh: '類型', ko: '유형', th: 'ประเภท' },
    'Amount': { zh: '金額', ko: '금액', th: 'จำนวน' },
    'Request Amount': { zh: '申請金額', ko: '요청 금액', th: 'จำนวนที่ขอ' },
    'Request Time': { zh: '申請時間', ko: '요청 시간', th: 'เวลาที่ขอ' },
    'Bonus': { zh: '紅利', ko: '보너스', th: 'โบนัส' },
    'Bank Reference': { zh: '銀行參考號', ko: '은행 참조', th: 'อ้างอิงธนาคาร' },
    'Deposit Time': { zh: '存款時間', ko: '입금 시간', th: 'เวลาฝาก' },
    'Bank Charge': { zh: '銀行手續費', ko: '은행 수수료', th: 'ค่าธรรมเนียมธนาคาร' },
    'Remark': { zh: '備註', ko: '비고', th: 'หมายเหตุ' },
    'Paid Amount': { zh: '已付金額', ko: '지급 금액', th: 'จำนวนที่จ่าย' },
    'Paid Date': { zh: '付款日期', ko: '지급 날짜', th: 'วันที่จ่าย' },
    'Game Type': { zh: '遊戲類型', ko: '게임 유형', th: 'ประเภทเกม' },
    'Win Amount': { zh: '贏得金額', ko: '당첨 금액', th: 'จำนวนที่ชนะ' },
    'Rebate': { zh: '返水', ko: '리베이트', th: 'เงินคืน' },
    'Status : All': { zh: '狀態：全部', ko: '상태 : 전체', th: 'สถานะ : ทั้งหมด' },
    'Confirm': { zh: '確認', ko: '확인', th: 'ยืนยัน' },
    'Auto refresh in': { zh: '自動刷新', ko: '자동 새로고침', th: 'รีเฟรชอัตโนมัติใน' },

    /* ── 紀錄類型／狀態值 ───────────────────── */
    'Approved': { zh: '已核准', ko: '승인됨', th: 'อนุมัติแล้ว' },
    'Pending': { zh: '處理中', ko: '대기 중', th: 'รอดำเนินการ' },
    'Rejected': { zh: '已拒絕', ko: '거부됨', th: 'ถูกปฏิเสธ' },
    'Deposit': { zh: '存款', ko: '입금', th: 'ฝากเงิน' },
    'Withdrawal': { zh: '提款', ko: '출금', th: 'ถอนเงิน' },
    'Bet': { zh: '投注', ko: '베팅', th: 'เดิมพัน' },
    'Win': { zh: '中獎', ko: '당첨', th: 'ชนะ' },
    'Betting': { zh: '投注', ko: '베팅', th: 'การเดิมพัน' },
    'Crypto': { zh: '加密貨幣', ko: '암호화폐', th: 'คริปโต' },
    'Bank': { zh: '銀行', ko: '은행', th: 'ธนาคาร' },

    /* ── 安全中心 ───────────────────────────── */
    'Last login': { zh: '上次登入', ko: '마지막 로그인', th: 'เข้าสู่ระบบล่าสุด' },
    'IP Address': { zh: 'IP 位址', ko: 'IP 주소', th: 'ที่อยู่ IP' },
    'Security Setting': { zh: '安全設定', ko: '보안 설정', th: 'การตั้งค่าความปลอดภัย' },
    'Complete your personal profile': { zh: '完善您的個人資料', ko: '개인 프로필을 완성하세요', th: 'กรอกโปรไฟล์ส่วนตัวของคุณ' },
    'Recommended letter and number combination': { zh: '建議使用字母與數字組合', ko: '문자와 숫자 조합 권장', th: 'แนะนำให้ใช้ตัวอักษรและตัวเลขผสมกัน' },
    'Set a password to improve the security of fund operations': { zh: '設定密碼以提升資金操作安全性', ko: '자금 운영 보안을 높이려면 비밀번호를 설정하세요', th: 'ตั้งรหัสผ่านเพื่อเพิ่มความปลอดภัยในการทำธุรกรรม' },
    'Logout safely': { zh: '安全登出', ko: '안전하게 로그아웃', th: 'ออกจากระบบอย่างปลอดภัย' },
    'Not set ›': { zh: '未設定 ›', ko: '미설정 ›', th: 'ยังไม่ตั้งค่า ›' },

    /* ── 個人資料 ───────────────────────────── */
    'General Information': { zh: '一般資訊', ko: '일반 정보', th: 'ข้อมูลทั่วไป' },

    /* ── 存款／提款表單 ─────────────────────── */
    'Choose promotion': { zh: '選擇優惠', ko: '프로모션 선택', th: 'เลือกโปรโมชัน' },
    'Apply for Deposit': { zh: '申請存款', ko: '입금 신청', th: 'ขอฝากเงิน' },
    'Submit': { zh: '送出', ko: '제출', th: 'ส่ง' },
    'Provider A': { zh: '供應商 A', ko: '공급사 A', th: 'ผู้ให้บริการ A' },
    'Provider B': { zh: '供應商 B', ko: '공급사 B', th: 'ผู้ให้บริการ B' },
    'Provider C': { zh: '供應商 C', ko: '공급사 C', th: 'ผู้ให้บริการ C' },
    'Provider D': { zh: '供應商 D', ko: '공급사 D', th: 'ผู้ให้บริการ D' },
    'Withdrawal Amount & Password': { zh: '提款金額與密碼', ko: '출금 금액 및 비밀번호', th: 'จำนวนถอนและรหัสผ่าน' },
    'Withdrawal Amount:': { zh: '提款金額：', ko: '출금 금액:', th: 'จำนวนถอน:' },
    'Transaction Password:': { zh: '交易密碼：', ko: '거래 비밀번호:', th: 'รหัสผ่านธุรกรรม:' },
    'Exclusion turnover list': { zh: '排除流水清單', ko: '제외 턴오버 목록', th: 'รายการยกเว้นเทิร์นโอเวอร์' },

    /* ── 客服 ───────────────────────────────── */
    'Customer Service': { zh: '客服中心', ko: '고객센터', th: 'บริการลูกค้า' },
    'Select Customer Service': { zh: '選擇客服管道', ko: '고객센터 선택', th: 'เลือกช่องทางบริการลูกค้า' },
    'Live Chat Customer Service Center': { zh: '線上即時客服中心', ko: '실시간 채팅 고객센터', th: 'ศูนย์แชทสดบริการลูกค้า' },
    'Promotion Announcement Room': { zh: '優惠公告專區', ko: '프로모션 공지방', th: 'ห้องประกาศโปรโมชัน' },

    /* ── 支援／關於／隱私（support、personal-info）─ */
    'Support': { zh: '支援', ko: '지원', th: 'สนับสนุน' },
    'Notice': { zh: '公告', ko: '공지', th: 'ประกาศ' },
    'About': { zh: '關於', ko: '소개', th: 'เกี่ยวกับ' },
    'Privacy': { zh: '隱私', ko: '개인정보', th: 'ความเป็นส่วนตัว' },
    'Info': { zh: '資訊', ko: '정보', th: 'ข้อมูล' },
    'Addiction': { zh: '成癮防治', ko: '중독 예방', th: 'การเสพติด' },
    'Rules': { zh: '規則', ko: '규칙', th: 'กฎ' },
    'FAQ': { zh: '常見問題', ko: '자주 묻는 질문', th: 'คำถามที่พบบ่อย' },
    'About Us': { zh: '關於我們', ko: '회사 소개', th: 'เกี่ยวกับเรา' },
    'About 100%': { zh: '關於 100%', ko: '100% 소개', th: 'เกี่ยวกับ 100%' },
    'We care about your privacy': { zh: '我們重視您的隱私', ko: '고객님의 개인정보를 소중히 여깁니다', th: 'เราใส่ใจความเป็นส่วนตัวของคุณ' },
    'All the user data are encrypted to ensure your personal privacy is protected.': { zh: '所有使用者資料皆已加密，確保您的個人隱私受到保護。', ko: '모든 사용자 데이터는 암호화되어 개인정보가 보호됩니다.', th: 'ข้อมูลผู้ใช้ทั้งหมดถูกเข้ารหัสเพื่อปกป้องความเป็นส่วนตัวของคุณ' },

    /* ── 共用 ───────────────────────────────── */
    'General Info': { zh: '一般資訊', ko: '일반 정보', th: 'ข้อมูลทั่วไป' }
  };
  window.CMS_I18N_MEMBER = M;
})();
