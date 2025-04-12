document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('form-feedback');

  try {
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (response.ok) {
      feedback.style.color = 'green';
      feedback.textContent = data.message;
      this.reset(); // clear form
    } else {
      feedback.style.color = 'red';
      feedback.textContent = Array.isArray(data.errors) ? data.errors.join('، ') : data.message;
    }
  } catch (error) {
    feedback.style.color = 'red';
    feedback.textContent = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.';
  }
});
