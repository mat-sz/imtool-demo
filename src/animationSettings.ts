const transitionProps = {
  duration: 0.1,
};

export const animationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitionProps,
};
