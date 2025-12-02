import "./Icon.css";

export default function Icon({ label, children, onClick }) {
  return (
    <button className="icon" onClick={onClick} type="button">
      <div className="icon__image">{children}</div>
      <span className="icon__label">{label}</span>
    </button>
  );
}
