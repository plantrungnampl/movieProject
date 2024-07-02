import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const TransitionNextPage = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();

  const variants = {
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.5,
      },
    },
    out: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.75,
      },
    },
  };

  return (
    <div className="effect-1 overflow-hidden">
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default TransitionNextPage;
