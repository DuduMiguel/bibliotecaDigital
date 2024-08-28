import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { inAxios } from "../config_axios"
import ItemLista from "./ItemLista"

function ManuntencaoJogos() {

    const { register, handleSubmit, reset, setValue } = useForm()

    const [jogos, setJogos] = useState([])
    const [jogoEdit, setJogoEdit] = useState(null)

    const obterLista = async () => {
        try {
            const lista = await inAxios.get('jogos')
            setJogos(lista.data)
        } catch (error) {
            alert(`Erro... Não foi possível obter os dados: ${error}`)
        }
    }

    const filtrarLista = async (campos) => {
        try {
            const lista = await inAxios.get(`jogos/filtro/${campos.palavra}`)
            lista.data.length ? setJogos(lista.data) : alert('Não há jogos com a palavra-chave pesquisada!')
        } catch (error) {
            alert(`Erro... Não foi possível obter os dados: ${error}`)
        }
    }

    const excluir = async (id, titulo) => {
        if (!window.confirm(`Tem certeza que deseja excluir ${titulo}? (Essa ação não poderá ser desfeita)`)) {
            return
        }
        try {
            setJogos(jogos.filter((jogo) => jogo.id !== id))
            await inAxios.delete(`jogos/${id}`)
        } catch (error) {
            alert(`Não foi possível excluir o jogo! : ${error}`)
        }
    }


    const editar = (jogo) => {
        setJogoEdit(jogo)
        setValue('titulo', jogo.titulo)
        setValue('produtora', jogo.produtora)
        setValue('ano', jogo.ano)
        setValue('preco', jogo.preco)
        setValue('capa', jogo.capa)
    }

    const salvarEdicao = async (campos) => {
        try {
            await inAxios.put(`jogos/${jogoEdit.id}`, campos)
            setJogoEdit(null)
            obterLista()
            alert('Jogo atualizado com sucesso!')
        } catch (error) {
            alert(`Erro ao atualizar o jogo: ${error}`)
        }
    }

    useEffect(() => {
        obterLista()
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h2 className="fst-italic mt-3">Manuntenção</h2>
                </div>
                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Título ou Produtora" required {...register("palavra")}></input>
                            <input type="submit" className="btn btn-primary ms-2" value="Pesquisar" required></input>
                            <input type="button" className="btn btn-danger ms-2" value="Todos" onClick={() => { reset({ palavra: '' }); obterLista(); }}></input>
                        </div>
                    </form>
                </div>
            </div>
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Título</th>
                        <th scope="col">Produtora</th>
                        <th scope="col">Ano</th>
                        <th scope="col">Preço R$</th>
                        <th scope="col">Capa</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {jogos.map((jogo, index) =>
                        <ItemLista key={jogo.id} id={jogo.id} titulo={jogo.titulo} produtora={jogo.produtora} ano={jogo.ano} preco={jogo.preco} capa={jogo.capa} excluirClick={() => excluir(jogo.id, jogo.titulo, index)} editarClick={() => editar(jogo)}></ItemLista>
                    )}
                </tbody>
            </table>

            {jogoEdit && (
                <div className="container mt-4">
                    <h3 className="fst-italic">Editar Jogo</h3>
                    <form onSubmit={handleSubmit(salvarEdicao)}>
                        <div className="form-group">
                            <label htmlFor="titulo">Título:</label>
                            <input type="text" className="form-control" id="titulo"  {...register("titulo")} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="produtora">Produtora:</label>
                            <input type="text" className="form-control" id="produtora" {...register("produtora")} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="ano">Ano:</label>
                            <input type="number" className="form-control" id="ano" {...register("ano")} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="preco">Preço R$:</label>
                            <input type="number" className="form-control" id="preco" step="0.01" {...register("preco")} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="capa">Capa (URL):</label>
                            <input type="url" className="form-control" id="capa"  {...register("capa")} />
                        </div>
                        <input type="submit" className="btn btn-primary mt-3" value="Salvar Alterações" />
                        <input type="button" className="btn btn-secondary mt-3 ms-3" value="Cancelar" onClick={() => setJogoEdit(null)} />
                    </form>
                </div>
            )}

        </div>
    )
}

export default ManuntencaoJogos


