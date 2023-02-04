import Modal from '../ui/Modal';

const SignInModal = () => {
  // todo - register user

  return (
    <Modal title='Sign In' id='signin'>
      <form>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Sign In</button>
      </form>
    </Modal>
  );
};

export default SignInModal;
