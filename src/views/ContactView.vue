<template>
  <div class="contact-page">
    <div class="contact-card">
      <p class="eyebrow">Let’s connect</p>
      <h1>Contact Job Hunt</h1>
      <p class="subtitle">
        Have a question about hiring, listings, or partnerships? Send us a message and our team will get back to you.
      </p>

      <form class="contact-form" @submit.prevent>
        <div class="field-row">
          <label>
            <span>Name</span>
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>
        </div>

        <label>
          <span>Subject</span>
          <input type="text" placeholder="How can we help?" />
        </label>

        <label>
          <span>Message</span>
          <textarea rows="5" placeholder="Tell us more..."></textarea>
        </label>

        <button type="submit">Send message</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView'
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 60px;
  background: linear-gradient(135deg, #071a29 0%, #0f2d42 100%);
}

.contact-card {
  width: min(760px, 100%);
  background: rgba(210, 239, 255, 0.04);
  border: 1px solid rgba(210, 239, 255, 0.2);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.25);
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #ffb347;
  font-size: 12px;
  font-weight: 700;
}

h1 {
  margin: 0;
  color: #d2efff;
  font-size: clamp(2rem, 4vw, 3rem);
}

.subtitle {
  margin: 14px 0 28px;
  color: #d2efff;
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #d2efff;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(210, 239, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: #d2efff;
  padding: 14px 16px;
  font: inherit;
}

input::placeholder,
textarea::placeholder {
  color: rgba(210, 239, 255, 0.7);
}

button {
  width: fit-content;
  border: none;
  border-radius: 12px;
  background: #ffb347;
  color: #071a29;
  font-weight: 800;
  padding: 12px 22px;
  cursor: pointer;
}

button:hover {
  background: #36d2ff;
}

@media (max-width: 640px) {
  .field-row {
    grid-template-columns: 1fr;
  }

  .contact-card {
    padding: 24px 18px;
  }
}
</style>
