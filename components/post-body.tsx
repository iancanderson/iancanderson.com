import markdownStyles from "./markdown-styles.module.css";

type Props = {
  children: any;
};

const PostBody = ({ children }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles["markdown"]}>{children}</div>
    </div>
  );
};

export default PostBody;
