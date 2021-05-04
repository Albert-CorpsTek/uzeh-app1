import GlobalContext from 'src/context';

const notify = (text: string, type: 'error' | 'success') => {
  const {
    notification: {
      isErrorRef,
      messageRef,
      visibleRef,
    },
  } = GlobalContext;

  const visible = visibleRef.access();
  const message = messageRef.access();
  const isError = isErrorRef.access();

  isError.set(type === 'error');
  message.set(text);
  visible.set(true);
};

export default notify;
