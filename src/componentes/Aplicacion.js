import React from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from './helper'


class Aplicacion extends React.Component{
   
    state ={
        resultado :'',
        datos: {}
    }
    contizarSeguro = (datos) =>{
        const{marca, plan, year}= datos;

        //Agregar una base de 2000
        let resultado=2000;

        //obtener la diferencia de a;os
        const diferencia= obtenerDiferenciaAnio(year);
        //por cada a;o restar el 3% al valor del seguro
            resultado -= ((diferencia * 3 ) * resultado)/100;
            
        //Americano 15% Asiatico 5% Europeo 30% al valor actual

        resultado=calcularMarca(marca)* resultado;
        
        //el plan basico incrementa 20% y el completo 50%
        let incrementoPlan = obtenerPlan(plan);

        //dependiendo del plan incrementa

        resultado = parseFloat(incrementoPlan*resultado).toFixed(2);
        console.log(resultado);
        
        //crear objeto para el resumen
        const datosAuto={
            marca: marca,
            plan: plan,
            year: year
        }
        
        //el costo y datos del objeto en el state
        this.setState({
            resultado: resultado,
            datos: datosAuto
        })
    }
    render(){
        
        return(
            <div className="contenedor">
            <Header
                titulo='Cotizador de Seguro de Auto'
            />

            <div className='contenedor-formulario'>
                <Formulario
                contizarSeguro={this.contizarSeguro}
                />
                <Resumen
                datos={this.state.datos}
                resultado={this.state.resultado}
                />
            </div>
            
            </div>
               
        );
    }
}
export default Aplicacion;