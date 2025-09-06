import Container from "./container";
import ThemePicker from "./theme-picker";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-6 flex items-center justify-end">
          <ThemePicker />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
