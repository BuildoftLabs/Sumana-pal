import { useId, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { buildWhatsAppHref } from "../components/WhatsAppFab";

export default function QuestionForm({ data }) {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const questionId = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [medicalConcern, setMedicalConcern] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const medicalConcernId = useId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "leads"), {
        name,
        phone,
        email,
        message: question,
        medicalConditions: medicalConcern,
        formSource: "Contact Form",
        status: "New",
        createdAt: new Date().toISOString()
      });

      const message = [
        "Hi! I want to enquire about your nutrition plans.",
        "",
        `Name: ${name || "-"}`,
        `Phone: ${phone || "-"}`,
        `Email: ${email || "-"}`,
        `Medical Concern: ${medicalConcern || "-"}`,
        `Question: ${question || "-"}`
      ].join("\n");

      window.open(buildWhatsAppHref(message), "_blank", "noopener,noreferrer");

      setName("");
      setPhone("");
      setEmail("");
      setQuestion("");
      setMedicalConcern("");
    } catch (error) {
      console.error("Error saving lead: ", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="question" id="contact" aria-label="Ask a question">
      <div className="question-inner">
        <p className="question-badge">{data.badge}</p>

        <div className="question-shell">
          <form
            className="question-form"
            onSubmit={handleSubmit}
            aria-label="Send your question"
          >
            <h3 className="question-form-title">{data.form.title}</h3>
            <p className="question-form-sub">{data.form.subtitle}</p>

            <label className="field">
              <span className="field-label">
                {data.form.fields.name.label} {data.form.fields.name.required ? <span className="req">*</span> : null}
              </span>
              <input
                className="field-input"
                id={nameId}
                type="text"
                placeholder={data.form.fields.name.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={Boolean(data.form.fields.name.required)}
              />
            </label>

            <label className="field">
              <span className="field-label">
                {data.form.fields.phone.label}{" "}
                {data.form.fields.phone.required ? <span className="req">*</span> : null}
              </span>
              <input
                className="field-input"
                id={phoneId}
                type="tel"
                placeholder={data.form.fields.phone.placeholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={Boolean(data.form.fields.phone.required)}
              />
            </label>

            <label className="field">
              <span className="field-label">
                {data.form.fields.email.label}{" "}
                {data.form.fields.email.required ? <span className="req">*</span> : null}
              </span>
              <input
                className="field-input"
                id={emailId}
                type="email"
                placeholder={data.form.fields.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={Boolean(data.form.fields.email.required)}
              />
            </label>

            <label className="field">
              <span className="field-label">
                Medical Concern
              </span>
              <input
                className="field-input"
                id={medicalConcernId}
                type="text"
                placeholder="Any medical concerns? (Optional)"
                value={medicalConcern}
                onChange={(e) => setMedicalConcern(e.target.value)}
              />
            </label>

            <label className="field">
              <span className="field-label">
                {data.form.fields.question.label}{" "}
                {data.form.fields.question.required ? <span className="req">*</span> : null}
              </span>
              <textarea
                className="field-textarea"
                id={questionId}
                rows={4}
                placeholder={data.form.fields.question.placeholder}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required={Boolean(data.form.fields.question.required)}
              />
            </label>

            <button className="question-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

