document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  console.log('Form submitted');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('form-feedback');

  console.log('Form data:', { name, email, message });

  try {
    console.log('Sending request to server...');
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    console.log('Server response status:', response.status);
    const data = await response.json();
    console.log('Server response data:', data);

    if (response.ok) {
      feedback.style.color = 'green';
      feedback.textContent = 'تم إرسال الرسالة بنجاح!';
      this.reset(); // clear form
    } else {
      feedback.style.color = 'red';
      if (data.errors && Array.isArray(data.errors)) {
        feedback.textContent = data.errors.map(error => error.msg).join('، ');
      } else {
        feedback.textContent = data.message || 'حدث خطأ أثناء الإرسال';
      }
    }
  } catch (error) {
    console.error('Error during form submission:', error);
    feedback.style.color = 'red';
    feedback.textContent = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.';
  }
});
