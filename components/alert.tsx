import Container from "./container";
import cn from "classnames";

type Props = {};

const Alert = ({}: Props) => {
  return (
    <div className="border-b bg-neutral-800 border-neutral-800 text-white">
      <Container>
        <div className="py-2 text-center text-sm">
          <>
            This page is a preview.{" "}
            <a
              href="/api/exit-preview"
              className="underline hover:text-teal-300 duration-200 transition-colors"
            >
              Click here
            </a>{" "}
            to exit preview mode.
          </>
        </div>
      </Container>
    </div>
  );
};

export default Alert;
