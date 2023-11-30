import "./StartScreen.css";

const StartScreen = ({startGame}) => {
    return (
    <div className= "start">
        <h1>Guees Word</h1>
        <p>Clique no botão para começar a jogar</p>
        <button onClick={startGame}>Iniciar o jogo</button>
    </div>
    )
}

export default StartScreen;