"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function BridgeButton({ text }: { text?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const modalRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setAmount("");
    setIsProcessing(false);
    setStatus("");
  };

  const handleBridge = async (e: any) => {
    e.preventDefault();

    if (!amount || isNaN(Number(amount))) {
      setStatus("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);
    setStatus("Processing bridge request...");

    // 브릿지 처리를 시뮬레이션
    setTimeout(() => {
      setStatus("Confirming transaction on XRPL...");

      setTimeout(() => {
        setStatus("Transferring to XRP EVM Sidechain...");

        setTimeout(() => {
          setStatus(`Successfully bridged ${amount} XRP!`);
          setIsProcessing(false);
        }, 4500);
      }, 2500);
    }, 2000);
  };

  return (
    <>
      <button
        className="w-full bg-white border border-[#EC407A] hover:bg-gray-100 text-[#EC407A] py-4 rounded-lg font-medium text-lg"
        onClick={openModal}
      >
        {isProcessing
          ? "Processing..."
          : text !== undefined
          ? text
          : "Send Support"}
      </button>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-4">Bridge XRP</h2>
              <p className="text-gray-600 mb-6">
                Bridge assets from XRP Ledger to XRP EVM Sidechain
              </p>

              <form onSubmit={handleBridge}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Address (XRPL)
                  </label>
                  <input
                    type="text"
                    value="rNeWunJK8RSGsD1uoyoRG7Dzt1vQFwNvFn"
                    disabled
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination Address (EVM)
                  </label>
                  <input
                    type="text"
                    value="0xB8Bb795b364550281feb9037e70E366CEa379290"
                    disabled
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (XRP)
                  </label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC407A]"
                    disabled={isProcessing}
                  />
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#EC407A] hover:bg-[#D81B60] text-white py-3 rounded-lg font-medium disabled:bg-[#F8BBD0] disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Bridge XRP"}
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isProcessing}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {status && (
                <div
                  className={`mt-4 p-3 rounded-md whitespace-pre-line ${
                    status.includes("Success")
                      ? "bg-green-50 text-green-700"
                      : "bg text-black text-start"
                  }`}
                >
                  <p>{status}</p>
                  {status.includes("Success") && (
                    <p className="mt-2 text-sm">
                      Transaction Hash:
                      0x7c9f8b5d4e3a2c1b0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d...
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-row items-center justify-center mt-6 gap-2">
                <span className="text-gray-600 text-sm">powered by </span>
                <a
                  href="https://xrpl.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC407A] hover:underline"
                >
                  <svg
                    width="60"
                    height="15"
                    viewBox="0 0 120 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.2888 2.06186L24.6393 3.71135L28.9692 8.06186C31.361 10.4536 33.5465 12.5361 33.8558 12.701C34.1651 12.866 34.6599 12.9897 34.9486 12.9897C35.2372 12.9897 35.732 12.866 36.0413 12.701C36.3506 12.5361 38.5362 10.4536 40.9279 8.06186L45.2578 3.71135L43.6084 2.06186L41.9589 0.412384L38.5568 3.81445C36.6806 5.69074 35.0516 7.21651 34.9486 7.21651C34.8455 7.21651 33.2167 5.69074 31.3403 3.81445L27.9382 0.412384L26.2888 2.06186Z"
                      fill="black"
                    ></path>
                    <path
                      d="M6.49489 1.69079C6.08252 2.82481 0.288703 27.3609 0.412414 27.4846C0.47427 27.5671 2.12376 27.6084 4.04128 27.5876L7.52581 27.5258L7.81448 25.9175L8.12376 24.3093L10.4949 24.3711L12.866 24.433L13.031 25.3608C13.1135 25.8764 13.2372 26.5979 13.299 26.9485L13.4227 27.6289H16.9073C18.8248 27.6289 20.4331 27.5465 20.495 27.4434C20.6805 27.1546 15.2372 1.77326 14.9691 1.60831C14.8454 1.52583 12.9073 1.44336 10.6598 1.44336C7.58767 1.44336 6.55675 1.50522 6.49489 1.69079ZM10.9279 9.83511C10.9279 10.5568 11.5464 15.6289 11.8763 17.6702L12.0207 18.5567H10.5361C9.11345 18.5567 9.0722 18.5361 9.1753 18.0826C9.38148 17.2166 10.2887 11.5671 10.433 10.33C10.5774 8.94852 10.9279 8.61862 10.9279 9.83511Z"
                      fill="black"
                    ></path>
                    <path
                      d="M51.1339 14.5361V27.6289L57.5875 27.5876L64.0205 27.5258L64.0823 24.3711L64.1442 21.2372H61.134H58.1442V19.2784V17.3196H60.8247H63.5256L63.4638 14.3712L63.4019 11.4434L60.7834 11.3815L58.1442 11.3196V9.4846V7.62893H61.134H64.1442L64.0823 4.57738L64.0205 1.54645L57.5875 1.4846L51.1339 1.44336V14.5361Z"
                      fill="black"
                    ></path>
                    <path
                      d="M65.6702 1.69071C65.6083 1.83505 65.5876 7.71133 65.6083 14.7423L65.6702 27.5258H71.7526H77.835L77.8969 24.3711L77.9587 21.237H75.3608H72.7836L72.7423 11.3814L72.6804 1.54638L69.2165 1.48452C66.5773 1.44329 65.732 1.48452 65.6702 1.69071Z"
                      fill="black"
                    ></path>
                    <path
                      d="M85.464 1.69072C85.1547 2.49485 79.2371 27.3402 79.3195 27.4639C79.4227 27.6701 86 27.6701 86.3092 27.4639C86.433 27.3815 86.6598 26.6392 86.8041 25.8144L87.0515 24.3298H89.3815C92 24.3298 91.8144 24.2269 92.0618 25.9794C92.3092 27.7732 91.9794 27.6289 95.8763 27.6289C97.7938 27.6289 99.4021 27.5463 99.4639 27.4434C99.6289 27.1959 94.1856 1.77319 93.9382 1.60825C93.8145 1.52577 91.8762 1.4433 89.6289 1.4433C86.5567 1.4433 85.5258 1.50515 85.464 1.69072ZM90.3093 13.7113C90.5567 15.7526 90.8041 17.6702 90.866 17.9794L90.9897 18.5567H89.4846C88.0412 18.5567 88.0001 18.5361 88.1238 18.0824C88.3093 17.3402 89.2372 11.6082 89.402 10.1031C89.6083 8.35052 89.7113 8.80412 90.3093 13.7113Z"
                      fill="black"
                    ></path>
                    <path
                      d="M101.134 1.67015C101.072 1.8351 101.052 7.71139 101.072 14.7423L101.134 27.5258L104.227 27.5876C105.938 27.6083 107.526 27.5876 107.794 27.5258L108.248 27.4228L108.268 22.4125C108.268 19.629 108.351 17.6496 108.454 17.9381C108.763 18.9073 111.773 26.8661 111.979 27.2578C112.165 27.5876 112.495 27.6289 115.773 27.6289C117.732 27.6289 119.402 27.5465 119.464 27.4433C119.526 27.3402 118.474 24.9691 117.114 22.165C115.753 19.3608 114.639 16.9485 114.639 16.8042C114.639 16.6599 114.907 16.433 115.258 16.2888C116.227 15.8969 117.629 14.2268 118.062 12.9691C118.619 11.3609 118.577 8.76294 117.959 6.94851C117.093 4.3918 114.804 2.4949 111.814 1.8351C111.279 1.71139 108.66 1.56707 106.041 1.5052C102.083 1.40211 101.217 1.44335 101.134 1.67015ZM109.732 7.62892C112.124 8.30933 111.979 12.2887 109.547 13.3196C108.227 13.8763 108.248 13.9176 108.248 10.5155C108.248 7.07222 108.186 7.19593 109.732 7.62892Z"
                      fill="black"
                    ></path>
                    <path
                      d="M22.3712 5.97945L20.7216 7.62894L24.1856 11.0929L27.6289 14.5361L24.1856 18L20.7216 21.4434L22.433 23.134L24.1237 24.8454L28.4742 20.5155C30.866 18.1237 32.9485 15.9382 33.1134 15.6289C33.4845 14.9279 33.4845 14.1444 33.1134 13.4434C32.8454 12.9485 24.3298 4.32996 24.1031 4.32996C24.0619 4.32996 23.2783 5.07222 22.3712 5.97945Z"
                      fill="black"
                    ></path>
                    <path
                      d="M41.299 8.7011C38.9072 11.1135 36.8454 13.299 36.7217 13.5465C36.4124 14.165 36.433 14.9691 36.7835 15.6289C36.9484 15.9382 39.0309 18.1237 41.4227 20.5155L45.7732 24.8454L47.4846 23.134L49.1752 21.4021L45.7319 18.0619C43.8144 16.2062 42.268 14.6186 42.268 14.5155C42.2474 14.4124 43.8144 12.8248 45.7113 10.9898L49.1752 7.64955L47.5257 6.00006C46.6186 5.07222 45.835 4.32996 45.7732 4.32996C45.7113 4.32996 43.7114 6.30934 41.299 8.7011Z"
                      fill="black"
                    ></path>
                    <path
                      d="M33.7115 16.4742C33.3815 16.6805 31.196 18.7836 28.866 21.1134L24.6393 25.3608L26.2888 27.0104L27.9382 28.6597L31.3403 25.2577C33.2167 23.3814 34.8455 21.8556 34.9486 21.8556C35.0516 21.8556 36.6806 23.3814 38.5568 25.2577L41.9589 28.6597L43.6084 27.0104L45.2578 25.3608L40.9279 21.0104C38.5362 18.6186 36.3506 16.536 36.0413 16.3712C35.2785 15.9793 34.4538 16.0001 33.7115 16.4742Z"
                      fill="black"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
