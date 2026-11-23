(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const rules = {
    name: v => v.trim() ? '' : 'Enter your full name.',
    email: v => !v.trim() ? 'Enter your email address.'
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter an email address like name@example.com.',
    message: v => v.trim().length >= 10 ? '' : 'Enter a message of at least 10 characters.'
  };
  const check = f => {
    const msg = rules[f.name](f.value);
    document.getElementById(f.id + '-error').textContent = msg;
    f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };
  Object.keys(rules).forEach(n => {
    const f = form.elements[n];
    f.addEventListener('blur', () => check(f));
    f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') check(f); });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = '';
    const bad = Object.keys(rules).map(n => form.elements[n]).filter(f => !check(f));
    if (bad.length) {
      status.textContent = `The form has ${bad.length} error${bad.length > 1 ? 's' : ''}. Fix the highlighted fields and send again.`;
      bad[0].focus();
      return;
    }
    form.reset();
    status.textContent = 'Thank you. Your message is valid. This demo form does not send messages yet, so please email you@example.com instead.';
  });
})();