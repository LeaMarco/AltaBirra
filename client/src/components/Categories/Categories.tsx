import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { QueryTypes, searchedPosts, setQuerySearch } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./Categories.module.css";

export default function Categories() {
  const searchQuery: QueryTypes = useSelector((state: RootState) => state.postsSearchQuery);

  const dispatch = useDispatch();
  const history = useHistory();

  async function handleSearch(event) {
    await dispatch(setQuerySearch({ genericType: event.target.value, title: undefined }));
    await dispatch(searchedPosts(searchQuery));
    history.push(`/search`);
  }

  var token = Object.keys(localStorage).join().includes('token');

  return (
    <div className={Style.container}>
      <div className={Style.subcontainer}>
        <input
          className={Style.categoryName}
          readOnly
          onClick={(event) => handleSearch(event)}
          value="Rubia"
        />
        <h2> Información </h2>
        <p className={Style.informacion}>
          {" "}
          La gran mayoría de mortales, cuando pensamos en una cerveza, nos
          imaginamos una bebida de color amarillo tirando a dorado. Eso es
          porque, aunque existan birras de todos los colores, la rubia es el
          prototipo de cerveza por excelencia. Pero dentro de esas cervezas
          rubias, existen muchos tipos muy diferentes, cada uno de ellos
          elaborados de una manera distinta o con una historia diferente detrás.
          Siendo estrictos, el término cerveza rubia no se refiere a ningún
          estilo o variedad específica sino que hace referencia a un amplio
          abanico de cervezas que tienen un elemento en común: el uso de maltas
          claras o pálidas.{" "}
        </p>
      </div>
      <div className={Style.subcontainer}>
        <input
          className={Style.categoryName}
          readOnly
          onClick={(event) => handleSearch(event)}
          value="Roja"
        />
        <h2> Información </h2>
        <p className={Style.informacion}>
          {" "}
          No se trata de un invento ni de un capricho de productores
          artesanales. Originaria de Escocia, la cerveza roja se encuentra desde
          hace siglos entre nosotros. Distinguida por su elaboración en la que
          predominan la malta y la cebada y su color rubí, se diferencia de su
          prima, la cerveza negra, porque casi no incluyen lúpulo, vegetal
          difícil de conseguir en Escocia y Gran Bretaña. Con una graduación
          alcohólica cercana a los 5 grados, se distingue además por sus aromas
          frutales.{" "}
        </p>
      </div>
      <div className={Style.subcontainer}>
        <input
          className={Style.categoryName}
          readOnly
          onClick={(event) => handleSearch(event)}
          value="Negra"
        />
        <h2> Informacion </h2>
        <p className={Style.informacion}>
          {" "}
          Pero, ¿cómo se consigue una cerveza negra? ¿Cómo se logra esa
          oscuridad final y de manera natural? La principal característica o
          diferencia respecto a otro tipo de cervezas es la utilización de
          maltas oscuras provenientes del cereal malteado (humedecido, germinado
          y secado) al que se le sigue aplicando calor durante períodos más
          largos de tiempo a mayores temperaturas, para conseguir, precisamente,
          ese tueste diferencial. En el proceso de tostado de las maltas se
          reduce el azúcar fermentable que contienen, si bien el tueste
          resultante les confiere un elenco de aromas y sabores que se
          transmitirán al producto final. Chocolate, café o regaliz son sólo
          algunos de esos sabores que suelen estar presentes en las cervezas
          negras y que con más facilidad se distinguen en nariz o boca.
        </p>
      </div>
    </div>
  );
}
