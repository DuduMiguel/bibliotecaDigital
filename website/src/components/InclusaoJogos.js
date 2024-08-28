import { useState } from "react"
import { useForm } from "react-hook-form"
import { inAxios } from "../config_axios"

function InclusaoJogos() {

    const { register, handleSubmit, reset } = useForm()

    const [aviso, setAviso] = useState('')

    const salvar = async (campos) => {
        try{
            const response = await inAxios.post('jogos',campos)
            setAviso(`Ok! Jogo cadastrado com id: ${response.data.id}`)
        }catch(error){
            setAviso(`Erro! Não foi possível cadastrar o jogo: ${error}`)
        }

        setTimeout(() => {
            setAviso('')
        },5000)

        reset({titulo: '', produtora: '', capa: '', ano: '', preco: ''})
    }

    return (
        <div className="container">
            <h2 className="fs-1 fst-italic mt-2 text-center">Inclusão de Jogos</h2>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    <input className="form-control" type="text" id="titulo" required autoFocus placeholder="Título do jogo" {...register("titulo")}></input>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="produtora">Produtora:</label>
                    <input type="text" className="form-control" id="produtora" required placeholder="Produtora do jogo" {...register("produtora")}></input>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="capa">Capa do jogo:</label>
                    <input type="url" className="form-control" id="capa" required placeholder="URL da foto da capa do jogo" {...register("capa")}></input>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="ano">Ano:</label>
                            <input type="number" className="form-control" id="ano" required placeholder="Ano de publicação do jogo" {...register("ano")}></input>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label htmlFor="preco">Preço R$:</label>
                            <input type="number" step={0.01} className="form-control" required placeholder="Preço em reais do jogo" {...register("preco")}></input>
                        </div>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary mt-3" value={'enviar'}></input>
                <input type="reset" className="btn btn-danger mt-3 ms-4" value={'Limpar campos'}></input>
            </form>
            <div className={`mt-4 ${aviso.startsWith('Ok!')} ? 'alert alert-success ' : ${aviso.startsWith('Erro!')} ? 'alert alert-danger' : ''`}> 
                {aviso}
            </div>
        </div>
    )
}

export default InclusaoJogos