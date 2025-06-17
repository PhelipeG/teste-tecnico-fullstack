import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "../../../context/CartContext";
import { createOrder, type CreateOrderRequest } from "../../../api/api";
import {
  checkoutSchema,
  type CheckoutData,
} from "../../../schemas/checkoutSchema";
import { formatPrice } from "../../../utils/util";
import OrderSuccess from "./OrderSuccess";
import ResumeCheckout from "./ResumeCheckout";

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Função para criar pedido
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (response) => {
      console.log("Pedido criado:", response);
      setOrderSuccess(true);
      clearCart();
      reset();
    },
    onError: (error) => {
      console.error("Erro:", error);
      alert("Erro ao processar pedido. Tente novamente.");
    },
  });

  // Função para enviar o formulário
  const onSubmit = (data: CheckoutData) => {
    if (items.length === 0) {
      alert("Carrinho está vazio!");
      return;
    }

    const orderData: CreateOrderRequest = {
      name: data.name,
      email: data.email,
      items: items.map((item) => item.product),
      totalPrice: totalPrice,
    };

    createOrderMutation.mutate(orderData);
  };
  // Se o pedido foi criado com sucesso
  if (orderSuccess) {
    return <OrderSuccess onNewOrder={() => setOrderSuccess(false)} />;
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Título */}
      <h2 className="text-xl font-semibold mb-6">Finalizar Pedido</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Resumo */}
        <ResumeCheckout items={items} totalPrice={totalPrice} />

        {/* Botão */}
        <button
          type="submit"
          disabled={createOrderMutation.isPending || items.length === 0}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
        >
          {createOrderMutation.isPending
            ? "Processando..."
            : `Finalizar Pedido - ${formatPrice(totalPrice)}`}
        </button>

        {/* Mensagem carrinho vazio */}
        {items.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            Adicione produtos ao carrinho
          </p>
        )}
      </form>
    </div>
  );
}
