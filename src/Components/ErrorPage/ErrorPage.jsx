import img from '../../assets/image/404.gif'

const ErrorPage = () => {
    return (
        <div className='flex items-center justify-center'>
            <img src={img} alt="" />
        </div>
    );
};

export default ErrorPage;