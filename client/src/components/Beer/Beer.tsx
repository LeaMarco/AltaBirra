import React from 'react'
import { useHistory } from 'react-router-dom';
import Style from './Beer.module.css';
import { useDispatch } from 'react-redux';
import { getDetail } from '../../actions';

const Beer = ({ id, image, title, ibu, abv, discount, price, rating }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const fetchDetail = async () => {
		await dispatch(getDetail(id));
		history.push(`/detailBeer/${id}`);
	};

	return (
		<div className={Style.containerBack}>
			<div className={Style.container}>
				<button
					onClick={fetchDetail}
					style={{ backgroundColor: "transparent", border: "none" }}
				>
					<img className={Style.image} alt="" src={image}></img>
					<div className={Style.info}>

						<h2 className={Style.title}>{title.toUpperCase()}</h2>
						<div className={Style.props}>
							<div className={Style.bottomInfo}>
								<div className={Style.numbers}>
									<div className={Style.numberColum}>
										<p className={Style.numberInColum}> IBU: </p>
										<p className={Style.numberInColum}> {ibu} </p>
									</div>
									<div className={Style.numberColum}>
										<p className={Style.numberInColum}> ABV: </p>
										<p className={Style.numberInColum}> {abv}% </p>
									</div>
								</div>
								<div className={Style.countabled}>
									<p className={Style.stars}> {"⭐".repeat(rating)} </p>
									{discount !== 0 ? (
										<div className={Style.countable}>
											<p className={Style.price}> ${(price - price * (discount / 100)).toFixed(2)} </p>
											<div className={Style.discountInfo}>
												<p className={Style.originalPrice}>${price}</p>
												<p className={Style.discount}> {discount}% OFF </p>
											</div>
										</div>
									) :
										<div className={Style.countable}>
											<p className={Style.price}>${price}</p>
										</div>

									}
								</div>
							</div>
						</div>
					</div>
				</button>
			</div>
		</div>
	);
};

export default Beer


// const Beer = ({Name,id,description,alcohol,price,ibu,review, img}) => {

//     return (
//         // <Link className="recipe" to={`/+++++++/${id}`}>
//         <Link className="beer" to={`/beers/${id}`}>
//             <div key={id}>
//                 <img alt="birrita" src={img}></img>
//                 <div className="beer-text">
//                     <h1>{Name}</h1>
//                     <div className="numbers">
//                     <h4>{alcohol}</h4><span>alcohol</span>
//                     <h5>{price}</h5><span>price</span>
//                     <h6>{ibu}</h6><span>ibu</span>
//                     <p>{review}</p><span>review</span>
//                     </div>
//                     <h3>{description}</h3>
//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default Beer
