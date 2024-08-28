import '../style/ItemLista.css';

function ItemLista(props){
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.titulo}</td>
            <td>{props.produtora}</td>
            <td>{props.ano}</td>
            <td className='text-end'>{Number(props.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
            <td className='text-center'>
                <img 
                src={props.capa} 
                alt={`Capa do ${props.titulo}`} 
                style={{width: '100px', cursor: 'pointer'}}
                onClick={() => window.open(props.capa, '_blank')}>
                </img>
            </td>
            <td className='text-center'>
                <i className='exclui text-danger fw-bold' title='excluir' onClick={props.excluirClick}>&#10008;</i>
                <i className='altera text-success fw-bold ms-2' title='alterar' onClick={props.editarClick}>&#9998;</i>
            </td>
        </tr>
    )
}

export default ItemLista