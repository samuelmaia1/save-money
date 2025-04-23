import Link from "next/link";

import { DoughnutChart } from "@/components/DoughnutChart";
import { ChartItem } from "@/interfaces/Chart";
import { ColorsContextProvider } from "@/hooks/useColors";

import style from "./page.module.scss";

export default async function Home() {

  const outcomes: ChartItem[] = [
    {
      title: 'Parcela PC',
      category: 'Cartão',
      value: 150
    },
    {
      title: 'Conta de luz',
      category: 'Despesas',
      value: 120
    },
    {
      title: 'Roupas do bebê',
      category: 'Compras',
      value: 240
    }
  ];

  await new Promise(resolve => setTimeout(resolve, 2000));

  return (
    <ColorsContextProvider>
      <div className={style.container}>
        <div className={style.content}>
          <h1 
              style={
                  {
                      fontWeight: 400, 
                      fontSize: '2.5rem',
                      display: 'inline'
                  }
              }
          >
              Economize dinheiro com o melhor app de <span style={{fontWeight: '400'}} className={style.strong}>gestão financeira.</span>
          </h1>

          <p>
              Adicione seus ganhos, gastos e receba relatórios personalizados do seu balanço financeiro.
          </p>

          <ul style={{margin: '2rem 0rem', paddingLeft: '1rem'}}>
            <li>Gráficos de investimentos</li>
            <li>Relatórios de gastos personalizado</li>
            <li>Controle de finanças</li>
            <li>Controle de vencimentos</li>
            <li>Comparativos de entradas e saídas</li>
        </ul>

          <div className={style.containerContentButton}>
            <Link href='/register' className={style.contentButton}>Junte-se a nós</Link>
            <Link href='/plans' className={style.contentButton}>Planos</Link>
          </div>
        </div>

        <DoughnutChart data={outcomes} label="Gastos mensais R$" title="Gastos mensais por categoria"/>
      </div>
    </ColorsContextProvider>
  );
}
