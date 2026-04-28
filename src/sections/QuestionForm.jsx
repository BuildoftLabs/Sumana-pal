export default function QuestionForm({ data }) {
  return (
    <section className="question" id="contact" aria-label="Ask a question">
      <div className="question-inner">
        <p className="question-badge">{data.badge}</p>

        <div className="question-shell">
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

