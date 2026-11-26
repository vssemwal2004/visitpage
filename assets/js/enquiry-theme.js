/* =====================================================================
   EduLeap enquiry widget · GEU hero theme (same design as the GEHU page)
   The widget renders into an open Shadow DOM, so page CSS cannot reach it.
   This file adds a <style> inside that shadow root and a few decorative
   elements, giving one compact form:
     navy header band (contour rings, ridge edge, badge, fact chips)
     white body, two fields per row, blue submit button.

   Presentation only. Field names, validation, the payload, UTM capture and
   the API URL stay with the vendor script, so leads go to the EduLeap CRM
   exactly as before. Text is replaced only while it still equals the vendor
   default, so wording set later in the CRM admin is respected.
   ===================================================================== */
(function () {
  'use strict';

  function icon(body, stroke) {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='" + stroke +
      "' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'>" + body + '</svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }
  var MUTED = '#6B7690';
  var I = {
    chevron: icon("<path d='m6 9 6 6 6-6'/>", '#123274'),
    user: icon("<circle cx='12' cy='8' r='4'/><path d='M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6'/>", MUTED),
    mail: icon("<rect x='3' y='5' width='18' height='14' rx='2.5'/><path d='m4 7 8 6 8-6'/>", MUTED),
    phone: icon("<path d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'/>", MUTED),
    pin: icon("<path d='M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z'/><circle cx='12' cy='9.5' r='2.5'/>", MUTED)
  };

  /* mountain edge at the foot of the header, same motif as the hero's ridge divider */
  var RIDGE = 'polygon(0 100%,0 62%,5% 34%,10% 58%,17% 12%,25% 52%,32% 28%,40% 64%,48% 16%,56% 56%,63% 30%,71% 66%,79% 22%,87% 58%,93% 36%,100% 62%,100% 100%)';

  var PAD = 20; // card padding; the header bleeds out by the same amount

  var CSS = [
    ':host{max-width:none;font-family:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#0B1530;color-scheme:light}',
    '.el-card{background:transparent;border:0;border-radius:0;box-shadow:none;padding:0 ' + PAD + 'px 18px;color:#0B1530;-webkit-backdrop-filter:none;backdrop-filter:none}',

    /* header band */
    '.el-header{position:relative;margin:0 -' + PAD + 'px 14px;padding:18px ' + PAD + 'px 30px;text-align:left;color:#fff;overflow:hidden;',
    '  background:repeating-radial-gradient(circle at 108% -12%,transparent 0 13px,rgba(245,183,0,.17) 13px 14px),',
    '    radial-gradient(90% 130% at 0% 0%,rgba(59,107,255,.42),transparent 62%),',
    '    linear-gradient(135deg,#123274 0%,#0A1B3F 100%)}',
    '.el-header::before{content:"Admissions 2027–28";display:inline-block;margin-bottom:8px;padding:3px 10px;border-radius:999px;background:rgba(245,183,0,.16);border:1px solid rgba(245,183,0,.4);font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#FFD34D}',
    '.el-header::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:16px;background:#fff;clip-path:' + RIDGE + '}',
    '.el-title{margin:0 0 2px;font-family:"Sora","Inter",sans-serif;font-size:22px;line-height:1.2;font-weight:700;letter-spacing:-.02em;color:#fff}',
    '.el-subtitle{font-size:13px;line-height:1.45;color:rgba(255,255,255,.74)}',
    '.geu-facts{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0;padding:0;list-style:none}',
    '.geu-facts li{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);font-size:11.5px;font-weight:600;line-height:1.5;color:rgba(255,255,255,.9)}',
    '.geu-facts li::before{content:"";width:6px;height:6px;border-radius:50%;background:#F5B700}',

    /* two fields per row at every width (the vendor drops to one column under 420px) */
    '.el-form-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px}',
    '.el-cascade-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px}',
    '.el-field-half{grid-column:span 1}',
    '.el-field-full{grid-column:span 2}',

    /* labels stay for assistive tech; placeholders carry the visible hint */
    '.el-label,.el-sub-label{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',

    /* controls */
    '.el-input,.el-select,.el-textarea{height:42px;padding:0 12px;font-size:14.5px;line-height:42px;border-radius:12px;border:1.5px solid #E2E7F1;background-color:#F4F6FB;background-repeat:no-repeat;color:#0B1530;box-shadow:none;transition:border-color .2s,box-shadow .2s,background-color .2s}',
    '.el-textarea{height:auto;min-height:42px;padding:10px 12px;line-height:1.4;resize:vertical}',
    '.el-input:hover,.el-select:hover{border-color:#C9D3E6}',
    '.el-input::placeholder,.el-textarea::placeholder{color:' + MUTED + ';opacity:1}',
    '.el-select{-webkit-appearance:none;appearance:none;padding-right:34px;cursor:pointer;background-image:' + I.chevron + ';background-position:right 12px center;background-size:16px}',
    '.el-select:has(option[value=""]:checked){color:' + MUTED + '}',
    '.el-select option{background:#fff;color:#0B1530}',
    '.el-input:focus,.el-select:focus,.el-textarea:focus{border-color:#1D4ED8;background-color:#fff;box-shadow:0 0 0 4px rgba(29,78,216,.14)}',
    '.el-input.el-error,.el-select.el-error{border-color:#EF4444;background-color:#FFF;box-shadow:0 0 0 3px rgba(239,68,68,.12)}',
    '.el-err-msg{margin-top:3px;font-size:11.5px;line-height:1.3;color:#DC2626}',
    '.el-alert{margin-bottom:10px;padding:9px 12px;border-radius:12px;font-size:12.5px}',
    '.el-alert-error{background:#FEF2F2;border:1px solid #FECACA;color:#B91C1C}',

    /* field icons once the card is wide enough to keep placeholders readable */
    '@container (min-width:400px){',
    '  .el-input[name="firstName"],.el-input[name="lastName"],.el-input[name="email"],.el-input[name="phoneNumber"],[name="state"],[name="city"]{padding-left:38px;background-position:left 12px center;background-size:17px}',
    '  .el-input[name="firstName"],.el-input[name="lastName"]{background-image:' + I.user + '}',
    '  .el-input[name="email"]{background-image:' + I.mail + '}',
    '  .el-input[name="phoneNumber"]{background-image:' + I.phone + '}',
    '  .el-input[name="state"],.el-input[name="city"]{background-image:' + I.pin + '}',
    '  .el-select[name="state"],.el-select[name="city"]{background-image:' + I.pin + ',' + I.chevron + ';background-position:left 12px center,right 12px center;background-size:17px,16px}',
    '}',

    /* submit */
    '.el-btn{height:48px;margin-top:6px;padding:0 20px;border-radius:999px;background:linear-gradient(100deg,#123274 0%,#1D4ED8 100%);color:#fff;font-size:15px;font-weight:700;letter-spacing:.01em;box-shadow:0 14px 26px -14px rgba(29,78,216,.85)}',
    '.el-btn:hover{filter:none;transform:translateY(-1px);box-shadow:0 18px 30px -14px rgba(29,78,216,.95)}',
    '.el-btn:focus-visible{outline:3px solid #F5B700;outline-offset:3px}',
    '.el-btn:not(:disabled) #btnLabel::after{content:"→";display:inline-block;margin-left:10px;color:#FFD34D;transition:transform .2s}',
    '.el-btn:hover #btnLabel::after{transform:translateX(3px)}',

    /* success / paused view */
    '.el-success-view{padding:36px 8px 24px}',
    '.el-success-icon{background:rgba(17,138,85,.12);color:#118A55;box-shadow:0 0 0 8px rgba(17,138,85,.05)}',
    '.el-success-title{font-family:"Sora","Inter",sans-serif;color:#0B1530}',
    '.el-success-desc{color:#55617B}',

    /* phones: 16px text stops iOS zooming into fields */
    '@media (max-width:540px){',
    '  .el-card{padding:0 16px 16px}',
    '  .el-header{margin:0 -16px 14px;padding:16px 16px 28px}',
    '  .el-title{font-size:20px}',
    '  .el-input,.el-select,.el-textarea{height:44px;padding:0 12px;font-size:16px;line-height:44px}',
    '  .el-select{padding-right:30px;background-position:right 10px center}',
    '  .el-textarea{height:auto;padding:10px 12px;line-height:1.4}',
    '}',
    '@media (max-width:359px){',
    '  .el-form-grid,.el-cascade-grid{grid-template-columns:minmax(0,1fr)}',
    '  .el-field-half,.el-field-full{grid-column:span 1}',
    '}'
  ].join('\n');

  /* vendor default text -> page wording */
  var TEXT = {
    'Enquire Now': 'Start your enquiry',
    'Take the first step towards your future. Speak with an admissions advisor.': 'An admissions counsellor will call you back.',
    'Submit Inquiry': 'Submit',
    'Inquiry Submitted!': 'Enquiry received'
  };

  /* facts already stated on this page */
  var FACTS = ['NAAC A+', 'NIRF #48', '140+ programmes'];

  /* placeholder per field: inputs by name, course selects by data-academic-field */
  var HINTS = {
    firstName: 'First name *',
    lastName: 'Last name',
    email: 'Email address *',
    phoneNumber: 'Mobile number *',
    interest: 'Programme of interest',
    state: 'State',
    city: 'City',
    leadRemark: 'Your question (optional)',
    institutionId: 'Institution',
    courseTypeId: 'Course type',
    campusId: 'Campus',
    departmentId: 'Department',
    academicLevelId: 'Study level',
    courseId: 'Programme'
  };

  function setAttr(node, name, value) {
    if (node.getAttribute(name) !== value) node.setAttribute(name, value);
  }

  /* Idempotent: writes only when something differs, so the observer settles. */
  function polish(root) {
    if (!root.querySelector('#geu-theme')) {
      var style = document.createElement('style');
      style.id = 'geu-theme';
      style.textContent = CSS;
      root.appendChild(style); // after the vendor <style>, so these rules win
    }

    var header = root.querySelector('#formView .el-header');
    if (header && !header.querySelector('.geu-facts')) {
      var list = document.createElement('ul');
      list.className = 'geu-facts';
      list.innerHTML = FACTS.map(function (f) { return '<li>' + f + '</li>'; }).join('');
      header.appendChild(list);
    }

    root.querySelectorAll('.el-title, .el-subtitle, .el-success-title, #btnLabel').forEach(function (node) {
      var next = TEXT[node.textContent.trim()];
      if (next) node.textContent = next;
    });

    root.querySelectorAll('input[name], textarea[name], select').forEach(function (field) {
      var hint = HINTS[field.getAttribute('name') || field.getAttribute('data-academic-field')];
      if (!hint) return;
      setAttr(field, 'aria-label', hint.replace(' *', ''));
      if (field.tagName === 'SELECT') {
        var first = field.options[0];
        if (first && first.value === '' && first.textContent !== hint) first.textContent = hint;
      } else {
        setAttr(field, 'placeholder', hint);
      }
    });
  }

  /* The vendor re-renders (live config, course cascade, errors), so re-apply on every change. */
  function watch(host) {
    var root = host.shadowRoot || host;
    host.setAttribute('data-themed', '');
    new MutationObserver(function () { polish(root); })
      .observe(root, { childList: true, subtree: true });
    polish(root);
  }

  /* The vendor script loads async; wait up to 15 s for it to mount. */
  var tries = 0;
  var timer = setInterval(function () {
    var pending = 0;
    document.querySelectorAll('[data-eduleap-widget]').forEach(function (host) {
      if (host.hasAttribute('data-themed')) return;
      if (host.shadowRoot || host.querySelector('.el-card')) watch(host);
      else pending++;
    });
    if (!pending || ++tries > 300) clearInterval(timer);
  }, 50);
})();
