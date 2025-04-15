import { DoughnutChart } from "@/components/DoughnutChart";
import styles from "./page.module.scss";
import { ChartItem } from "@/interfaces/Chart";
import { ColorsContextProvider } from "@/hooks/useColors";

export default function Home() {

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

  return (
    <ColorsContextProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 
              style={
                  {
                      fontWeight: 400, 
                      fontSize: '3rem',
                      display: 'inline'
                  }
              }
          >
              Economize dinheiro com o melhor app de <span style={{fontWeight: '400'}} className={styles.strong}>gestão financeira.</span>
          </h1>

          <p>
              Adicione seus ganhos, gastos e receba relatórios personalizados do seu balanço financeiro.
          </p>
        </div>

        <DoughnutChart data={outcomes} label="Gastos mensais R$" title="Gastos mensais por categoria"/>
      </div>
    </ColorsContextProvider>
  );
}
