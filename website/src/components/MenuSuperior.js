import { Link } from "react-router-dom";

function MenuSuperior() {
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand" to='/'> Controle pessoal de Jogos</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" to='/'>Inclusão de Jogos</Link> 
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to='/manuntencao'> Manuntenção de Jogos </Link>  
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to='/resumo'>Resumo dos Jogos</Link> 
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default MenuSuperior;