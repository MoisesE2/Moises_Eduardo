import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Importe o EmailJS

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false); // Estado de carregamento

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.send(
                'service_2fk1252',
                'template_zuuw2sr',  
                { email },           
                'Baclm0nvvrHilYgFm'   
            );

            console.log("Email enviado para moises.eduardogc@gmail.com");
            setSubmitted(true);
            setEmail("");
        } catch (error) {
            console.error("Falha no envio:", error);
            alert("Erro ao enviar! Tente novamente.");
        } finally {
            setLoading(false);
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="py-20 bg-black dark:bg-black">
            <div className="flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">
                        Quer acompanhar minha evolução?
                    </h2>
                    <p className="text-gray-300 mb-6 text-center">
                        Inscreva-se para receber tudo isso e muito mais diretamente no seu email!
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col relative">
                        <input
                            type="email"
                            placeholder="Adicione seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-600 text-gray-100 border-0 rounded-md p-3 mb-4
                                       focus:bg-gray-500 focus:outline-none focus:ring-2 
                                       focus:ring-blue-500 transition duration-150
                                       placeholder-gray-400"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white 
                                     font-bold py-3 px-6 rounded-md transition duration-150
                                     transform hover:scale-105
                                     ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-600 hover:to-blue-600'}`}
                        >
                            {loading ? 'Enviando...' : 'Inscrever-se'}
                        </button>

                        <AnimatePresence>
                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute top-full mt-8 w-full flex items-center justify-center text-green-400"
                                >
                                    <CheckCircle2 className="mr-2" />
                                    Email adicionado com sucesso!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;