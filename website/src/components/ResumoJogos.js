import { useEffect, useState } from "react"
import { inAxios } from "../config_axios"
import { Chart } from "react-google-charts";

function ResumoJogos() {
    const [resumo, setResumo] = useState([])
    const [grafico, setGrafico] = useState([])
    const [jogosMaisCaros, setJogosMaisCaros] = useState([])
    const [jogosPorAno, setJogosPorAno] = useState([])
    const [isVisible, setIsVisible] = useState(false)

    const obterDados = async () => {
        try {
            const dadosResumo = await inAxios.get('jogos/dados/resumo')
            setResumo(dadosResumo.data)
            const dadosGrafico = await inAxios.get('jogos/dados/grafico')
            const arrayGrafico = [["Ano", "R$ total"]]
            dadosGrafico.data.map((dado) =>
                arrayGrafico.push([dado.ano.toString(), dado.total]))
            setGrafico(arrayGrafico)
        } catch (error) {
            alert(`Erro... Não foi possível obter os dados: ${error}`)
        }
    }

    const obterJogosMaisCaros = async () => {
        try {
            const response = await inAxios.get('jogos/dados/maiscaro')
            setJogosMaisCaros(response.data)
        } catch (error) {
            alert(`Erro ao obter os jogos mais caros: ${error}`)
        }
    }

    const obterJogosPorAno = async (ano) => {
        try {
            const response = await inAxios.get(`jogos/dados/${ano}`)
            setJogosPorAno(response.data)
        } catch (error) {
            alert(`Erro ao obter jogos para o ano ${ano}: ${error}`)
        }
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    useEffect(() => {
        obterDados()
        obterJogosMaisCaros()
    }, [])

    return (
        <div className="container">
            <h1 className="mt-2">Resumo</h1>

            <span className="btn btn-outline-primary btn-lg">
                <p className="badge bg-danger">{resumo.totalDeJogos}</p>
                <p>Nº de jogos cadastrados</p>
            </span>

            <span className="btn btn-outline-primary btn-lg mx-2">
                <p className="badge bg-danger">{Number(resumo.somaPreco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p>Total investido em jogos</p>
            </span>

            <span
                className="btn btn-outline-primary btn-lg me-2"
                onClick={toggleVisibility}
                style={{ cursor: "pointer" }}
            >
                <p className="badge bg-danger">
                    {Number(resumo.maxPreco).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
                <p>Jogo(s) mais caro(s) cadastrado</p>
                {isVisible && jogosMaisCaros.length > 0 && (
                    <div>
                        <ul>
                            {jogosMaisCaros.map((jogo) => (
                                <li key={jogo.id}>
                                    {jogo.titulo} - {" "}
                                    {Number(jogo.preco).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </span>

            <span className="btn btn-outline-primary btn-lg">
                <p className="badge bg-danger">{Number(resumo.mediaPreco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p>Média de preço dos jogos cadastrados</p>
            </span>

            <div className="d-flex justify-content-center">
                <Chart
                    key={grafico.length}
                    width={1000}
                    height={420}
                    chartType="ColumnChart"
                    loader={<div>Carregando gráfico...</div>}
                    data={grafico}
                    option={{
                        tittle: "Total de investimentos em jogos - por ano de lançamento",
                        chartArea: { width: "80%" },
                        hAxis: { tittle: "Ano de lançamento" },
                        vAxis: { tittle: "Preço acumulado R$" },
                        legend: { position: "none" },
                    }}
                    chartEvents={[
                        {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                                const chart = chartWrapper.getChart()
                                const selection = chart.getSelection()
                                if (selection.length > 0) {
                                    const rowIndex = selection[0].row
                                    if (rowIndex !== undefined && grafico[rowIndex + 1]) {
                                        const anoSelecionado = grafico[rowIndex + 1][0]
                                        obterJogosPorAno(anoSelecionado)
                                    }else{
                                        alert('Seleção inválida!')
                                    }
                                }
                            }
                        }
                    ]}
                />
                {jogosPorAno.length > 0 && (
                    <div className="mt-3">
                        <h3>Jogos do ano Selecionado:</h3>
                        <ul>
                            {jogosPorAno.map((jogo, index) => (
                                <li key={jogo.id}>
                                    {`${index + 1}º`} {jogo.titulo} - {Number(jogo.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResumoJogos