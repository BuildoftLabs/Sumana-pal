export default function QuestionForm({ data }) {
  return (
    <section className="question" id="contact" aria-label="Ask a question">
      <div className="question-inner">
        <p className="question-badge">{data.badge}</p>

        <div className="question-shell">
          <div className="question-left" aria-label="Prompt">
            <div className="question-left-art" aria-hidden="true">
              <div className="q-circle q-circle-a" />
              <div className="q-circle q-circle-b" />
              <div className="q-icon">
                <svg viewBox="0 0 64 64" role="img" aria-label="paper plane icon">
                  <path
                    d="M56 10 8 32l16 6 6 16 26-44Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M56 10 24 38"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <p className="question-big">
              <span className="question-big-strong">{data.left.titleStrong}</span>
              <br />
              <span className="question-big-muted">{data.left.titleMuted}</span>
            </p>
          </div>

          <form
            className="question-form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Send your question"
          >
            <h3 className="question-form-title">{data.form.title}</h3>
            <p className="question-form-sub">{data.form.subtitle}</p>

            <label className="field">
              <span className="field-label">
                {data.form.fields.name.label} {data.form.fields.name.required ? <span className="req">*</span> : null}
              </span>
              <input className="field-input" type="text" placeholder={data.form.fields.name.placeholder} />
            </label>

            <label className="field">
              <span className="field-label">
                {data.form.fields.phone.label}{" "}
                {data.form.fields.phone.required ? <span className="req">*</span> : null}
              </span>
              <input className="field-input" type="tel" placeholder={data.form.fields.phone.placeholder} />
            </label>

            <label className="field">
              <span className="field-label">
                {data.form.fields.email.label}{" "}
                {data.form.fields.email.required ? <span className="req">*</span> : null}
              </span>
              <input className="field-input" type="email" placeholder={data.form.fields.email.placeholder} />
            </label>

            <label className="field">
              <span className="field-label">
                {data.form.fields.question.label}{" "}
                {data.form.fields.question.required ? <span className="req">*</span> : null}
              </span>
              <textarea className="field-textarea" rows={4} placeholder={data.form.fields.question.placeholder} />
            </label>

            <button className="question-submit" type="submit">
              {data.form.buttonLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

