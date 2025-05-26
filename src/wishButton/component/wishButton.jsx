import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const wishButton = () => {
    const [like, setLike] = useState(false);

    return (
                        
        <button onClick={like => true}>❤</button>
        <button onClick={like => false}>🤍</button>


    );
}

export default wishButton;