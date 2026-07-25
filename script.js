// ==========================================================
// Enroute — Login page interactivity
// ==========================================================

const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const togglePass = document.getElementById('toggle-pass');
const eyeIcon = document.getElementById('eye-icon');
const submitBtn = document.getElementById('submit-btn');
const submitLabel = document.getElementById('submit-label');
const formStatus = document.getElementById('form-status');

// ---------- Show / hide password ----------
togglePass.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePass.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');

  eyeIcon.innerHTML = isPassword
    ? `<path d="M3 3l18 18M10.6 10.7a2.5 2.5 0 0 0 3.5 3.5M6.5 6.7C4.3 8.1 2.6 10 2 12c0 0 4 7 11 7 2 0 3.7-.5 5.1-1.2M14.5 5.3C13.7 5.1 12.9 5 12 5 5 5 1 12 1 12a17 17 0 0 0 3.2 4"
        stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
    : `<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" stroke="currentColor" stroke-width="1.6"/>
       <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>`;
});

// ---------- Simple client-side validation ----------
function validateEmail(value) {
  if (!value.trim()) return 'Enter your email or phone number.';
  const looksLikeEmail = /\S+@\S+\.\S+/.test(value);
  const looksLikePhone = /^[0-9+\-\s]{7,15}$/.test(value);
  if (!looksLikeEmail && !looksLikePhone) return 'Enter a valid email or phone number.';
  return '';
}

function validatePassword(value) {
  if (!value) return 'Enter your password.';
  if (value.length < 6) return 'Password must be at least 6 characters.';
  return '';
}

function setFieldError(inputEl, errorEl, message) {
  const field = inputEl.closest('.field');
  errorEl.textContent = message;
  field.classList.toggle('has-error', Boolean(message));
}

emailInput.addEventListener('blur', () => {
  setFieldError(emailInput, emailError, validateEmail(emailInput.value));
});
passwordInput.addEventListener('blur', () => {
  setFieldError(passwordInput, passwordError, validatePassword(passwordInput.value));
});

// ---------- Submit ----------
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailMsg = validateEmail(emailInput.value);
  const passwordMsg = validatePassword(passwordInput.value);
  setFieldError(emailInput, emailError, emailMsg);
  setFieldError(passwordInput, passwordError, passwordMsg);

  if (emailMsg || passwordMsg) return;

  formStatus.textContent = '';
  formStatus.classList.remove('is-error');
  submitBtn.disabled = true;
  submitLabel.textContent = 'Logging in…';

  try {
    // -----------------------------------------------------------
    // Wire this up to your FastAPI backend, e.g.:
    //
    // const res = await fetch('https://your-api.example.com/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     identifier: emailInput.value.trim(),
    //     password: passwordInput.value,
    //     remember: document.getElementById('remember').checked
    //   })
    // });
    // if (!res.ok) throw new Error('Invalid credentials');
    // const data = await res.json();
    // store data.token, then redirect to the dashboard
    // -----------------------------------------------------------

    await new Promise((resolve) => setTimeout(resolve, 900)); // placeholder delay

    formStatus.textContent = 'Logged in — redirecting to your dashboard…';
  } catch (err) {
    formStatus.textContent = 'Could not log in. Check your details and try again.';
    formStatus.classList.add('is-error');
  } finally {
    submitBtn.disabled = false;
    submitLabel.textContent = 'Log in';
  }
});
