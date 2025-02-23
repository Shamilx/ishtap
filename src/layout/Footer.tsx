import React from "react";

type Props = {
  className?: string;
};

function Footer(props: Props) {
  return (
    <footer className="dark:bg-[#161616] bg-black/50">
      <p className={props.className}>© Copyrights belongs to Shamil</p>
    </footer>
  );
}

export default Footer;
