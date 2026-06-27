import { useState } from "react";
import NavbarProductDetail from "../components/navbarProductDetail";
import Footer from "../components/footer";

const images = [
  "/portatil.png",
  "/portatil2.png",
  "/portatil3.png",
  "/portatil4.png",
];

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);

  const product = {
    name: "Laptop ASUS TUF Gaming F15",
    price: "$4.500.000",
    oldPrice: "$5.100.000",
    discount: "12% OFF",
    stock: 12,
    rating: 4.8,

    description:
      "Laptop gamer de alto rendimiento equipada con Intel Core i7, RTX 4060, 16 GB de RAM y SSD de 1 TB. Perfecta para videojuegos, programación, edición de video, desarrollo de software y diseño gráfico.",

    specifications: {
      Procesador: "Intel Core i7-13620H",
      Memoria: "16 GB DDR5",
      Disco: "SSD NVMe 1 TB",
      Pantalla: '15.6" 144Hz IPS',
      Gráfica: "RTX 4060 8GB",
      Sistema: "Windows 11",
    },
  };

  return (
    <>
      <NavbarProductDetail />

      <div className="min-h-screen bg-[#0E1629] text-white">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="bg-[#16213E] rounded-3xl shadow-2xl p-8">

            <div className="grid lg:grid-cols-2 gap-12">

              {/* GALERÍA */}

              <div>

                <div className="bg-white rounded-2xl h-[500px] flex items-center justify-center overflow-hidden">

                  <img
                    src={images[selectedImage]}
                    alt="Producto"
                    className="w-full h-full object-contain"
                  />

                </div>

                <div className="flex gap-4 mt-5">

                  {images.map((image, index) => (

                    <img
                      key={index}
                      src={image}
                      onClick={() => setSelectedImage(index)}
                      className={`w-24 h-24 rounded-xl cursor-pointer object-cover transition

                      ${
                        selectedImage === index
                          ? "border-4 border-green-500"
                          : "border border-gray-600 hover:border-green-500"
                      }`}
                    />

                  ))}

                </div>

              </div>

              {/* INFORMACIÓN */}

              <div>

                <h1 className="text-5xl font-bold leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mt-5">

                </div>

                <div className="mt-8">

                  <p className="text-gray-400 line-through text-2xl">
                    {product.oldPrice}
                  </p>

                  <div className="flex items-center gap-5 mt-2">

                    <h2 className="text-6xl font-bold text-green-400">
                      {product.price}
                    </h2>

                    <span className="bg-green-500 text-black font-bold px-4 py-2 rounded-full">
                      {product.discount}
                    </span>

                  </div>

                </div>

                <div className="mt-8">

                  <p className="text-green-400 text-lg font-semibold">
                     Disponible
                  </p>

                  <p className="text-gray-300 mt-1">
                    Stock: {product.stock} unidades
                  </p>

                </div>

                <div className="mt-8">

                  <h3 className="font-semibold text-lg mb-4">
                    Cantidad
                  </h3>

                  <div className="flex items-center gap-5">

                    <button
                      onClick={() =>
                        quantity > 1 &&
                        setQuantity(quantity - 1)
                      }
                      className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-green-500 transition"
                    >
                      -
                    </button>

                    <span className="text-3xl font-bold">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity(quantity + 1)
                      }
                      className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-green-500 transition"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="mt-10 space-y-4">

                  <button
                    onClick={() =>
                      setFavorite(!favorite)
                    }
                    className="w-full border border-pink-500 rounded-xl py-4 hover:bg-pink-600 transition"
                  >
                    {favorite
                      ? "❤️ En Favoritos"
                      : "🤍 Agregar a Favoritos"}
                  </button>

                  <button className="w-full bg-green-500 hover:bg-green-600 rounded-xl py-4 font-bold text-black transition">
                    Agregar al carrito
                  </button>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-bold transition">
                    Comprar ahora
                  </button>

                </div>

              </div>

            </div>

            {/* DESCRIPCIÓN + ESPECIFICACIONES */}

            <div className="grid lg:grid-cols-2 gap-10 mt-16">

              <div>

                <h2 className="text-3xl font-bold mb-5">
                  Descripción
                </h2>

                <p className="text-gray-300 leading-8 text-lg">
                  {product.description}
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold mb-5">
                  Especificaciones
                </h2>

                <div className="grid grid-cols-2 gap-4">

                  {Object.entries(product.specifications).map(([key, value]) => (

                    <div
                      key={key}
                      className="bg-[#1F2A44] rounded-xl border border-gray-700 p-5"
                    >

                      <p className="text-gray-400">
                        {key}
                      </p>

                      <p className="font-bold mt-2">
                        {value}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>
                        {/* CALIFICACIÓN */}

            <div className="mt-20">

              <h2 className="text-3xl font-bold mb-8">
                Calificación de los clientes
              </h2>

              <div className="bg-[#1F2A44] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">

                <div className="text-center">

                  <h3 className="text-6xl font-bold text-green-400">
                    {product.rating}
                  </h3>

                  <p className="text-yellow-400 text-3xl mt-2">
                    ⭐⭐⭐⭐⭐
                  </p>

                </div>

                <div className="mt-8 md:mt-0 w-full md:w-96 space-y-3">

                  {[5,4,3,2,1].map((star)=>(
                    <div
                      key={star}
                      className="flex items-center gap-3"
                    >

                      <span className="w-8">
                        {star}★
                      </span>

                      <div className="flex-1 bg-gray-700 rounded-full h-3">

                        <div
                          className={`bg-green-500 h-3 rounded-full ${
                            star===5
                              ? "w-[85%]"
                              : star===4
                              ? "w-[10%]"
                              : star===3
                              ? "w-[3%]"
                              : star===2
                              ? "w-[1%]"
                              : "w-[1%]"
                          }`}
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* COMENTARIOS */}

            <div className="mt-20">

              <h2 className="text-3xl font-bold mb-8">
                Comentarios
              </h2>

              <div className="space-y-5">

                {[
                  {
                    name:"Juan Pérez",
                    stars:"⭐⭐⭐⭐⭐",
                    text:"Excelente computador. Muy rápido para programación y juegos."
                  },
                  {
                    name:"Laura Gómez",
                    stars:"⭐⭐⭐⭐☆",
                    text:"Muy buena compra. Llegó antes del tiempo estimado."
                  },
                  {
                    name:"Carlos Rodríguez",
                    stars:"⭐⭐⭐⭐⭐",
                    text:"Muy recomendado. Excelente rendimiento para diseño y edición."
                  }

                ].map((comment,index)=>(

                  <div
                    key={index}
                    className="bg-[#1F2A44] rounded-2xl p-6 border border-gray-700"
                  >

                    <div className="flex justify-between items-center">

                      <h3 className="font-bold text-lg">
                        {comment.name}
                      </h3>

                      <span className="text-yellow-400">
                        {comment.stars}
                      </span>

                    </div>

                    <p className="text-gray-300 mt-4">
                      {comment.text}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* PRODUCTOS RELACIONADOS */}

            <div className="mt-20">

              <h2 className="text-3xl font-bold mb-8">
                Productos relacionados
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {[1,2,3,4].map((item)=>(

                  <div
                    key={item}
                    className="bg-[#1F2A44] rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >

                    <img
                      src={images[item-1]}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-5">

                      <h3 className="font-bold text-lg">
                        ASUS TUF Gaming
                      </h3>

                      <p className="text-gray-400 mt-2">
                        Intel Core i7 · RTX 4060
                      </p>

                      <p className="text-green-400 font-bold text-xl mt-4">
                        $4.500.000
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

};

export default ProductDetail;