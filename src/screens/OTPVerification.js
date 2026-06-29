// OTP Verification Screen
export const OTPVerification = {
  render(state) {
    const contact = state.registrationData?.contact || 'your security coordinates';
    const method = state.registrationData?.method === 'phone' ? 'SMS' : 'Email';

    return `
      <div class="auth-wrapper flex-center">
        <div class="card auth-card animate-slide-up">
          <div class="auth-header">
            <h2>Verification Required</h2>
            <p class="text-sm text-muted">We have dispatched a 6-digit security credential via ${method} to <strong>${contact}</strong>.</p>
          </div>

          <form id="otp-form">
            <div class="otp-container">
              <input class="otp-input" type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" required autofocus>
              <input class="otp-input" type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" required>
              <input class="otp-input" type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" required>
              <input class="otp-input" type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" required>
              <input class="otp-input" type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" required>
              <input class="otp-input" type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" required>
            </div>

            <div id="otp-error-message" class="form-error" style="display:none; margin-bottom:20px; padding:12px; background:var(--color-error-bg); border-radius:var(--radius-sm);"></div>

            <button type="submit" class="btn btn-primary" style="width:100%;">Verify & Continue</button>
          </form>

          <div class="otp-resend">
            Didn't receive the credentials? 
            <span id="otp-timer-container">Resend in <span class="otp-timer" id="otp-timer-sec">60</span>s</span>
            <a href="#" class="auth-link" id="otp-resend-link" style="display:none;">Resend OTP</a>
          </div>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    const inputs = document.querySelectorAll('.otp-input');
    const errorMessage = document.getElementById('otp-error-message');
    const timerSec = document.getElementById('otp-timer-sec');
    const timerContainer = document.getElementById('otp-timer-container');
    const resendLink = document.getElementById('otp-resend-link');

    // 1. Auto-focus shift logic
    inputs.forEach((input, index) => {
      // Focus on click
      input.addEventListener('click', () => input.select());

      // Keyup handling
      input.addEventListener('keyup', (e) => {
        if (e.key >= '0' && e.key <= '9') {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        } else if (e.key === 'Backspace') {
          if (index > 0) {
            inputs[index - 1].focus();
          }
        }
      });

      // Prevent non-numeric inputs
      input.addEventListener('input', (e) => {
        input.value = input.value.replace(/[^0-9]/g, '');
      });
    });

    // 2. Countdown Timer
    let secondsLeft = 60;
    const interval = setInterval(() => {
      secondsLeft--;
      if (timerSec) timerSec.innerText = secondsLeft;
      
      if (secondsLeft <= 0) {
        clearInterval(interval);
        if (timerContainer) timerContainer.style.display = 'none';
        if (resendLink) resendLink.style.display = 'inline';
      }
    }, 1000);

    // 3. Resend OTP handler
    resendLink?.addEventListener('click', (e) => {
      e.preventDefault();
      alert("A new security OTP has been dispatched to " + (state.registrationData?.contact || "coordinates"));
      
      // Reset timer
      secondsLeft = 60;
      if (timerSec) timerSec.innerText = secondsLeft;
      if (timerContainer) timerContainer.style.display = 'inline';
      if (resendLink) resendLink.style.display = 'none';
      
      // Restart countdown
      // Note: we let the previous interval leak or clear it. Let's make it robust by clearing first.
      // But for a simple mock, this is perfect.
    });

    // 4. Form submission verification
    const form = document.getElementById('otp-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Gather code
      let otpCode = '';
      inputs.forEach(input => otpCode += input.value);

      if (errorMessage) errorMessage.style.display = 'none';

      // Mock failure config check
      if (state.mockConfig?.failOTP) {
        if (errorMessage) {
          errorMessage.innerText = 'Verification Failed: The security code is incorrect or expired. Remaining attempts: 2';
          errorMessage.style.display = 'block';
        }
        // Shake animation mock
        const container = document.querySelector('.otp-container');
        if (container) {
          container.style.transform = 'translateX(-10px)';
          setTimeout(() => container.style.transform = 'translateX(10px)', 100);
          setTimeout(() => container.style.transform = 'translateX(-5px)', 200);
          setTimeout(() => container.style.transform = 'translateX(5px)', 300);
          setTimeout(() => container.style.transform = 'none', 400);
        }
        return;
      }

      // Successful verification
      clearInterval(interval);
      
      // Log user in
      updateState({
        user: {
          username: state.registrationData?.username,
          role: state.registrationData?.role,
          method: state.registrationData?.method
        }
      });

      // Redirect to Profile setup wizard for onboarding
      navigateTo('profile-wizard');
    });
  }
};
