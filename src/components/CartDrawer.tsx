import { ShoppingBag, X, Plus, Minus, Send, Check } from 'lucide-react';
import { CartItem } from '../types';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [userName, setUserName] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'train'>('dine-in');
  const [detailLabel, setDetailLabel] = useState(''); // Table number or Coach/Seat
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.menuItem.price * item.quantity), 0);

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let orderDetails = `*📚 Read & Roast (RAR) Order Request ☕*\n`;
    orderDetails += `==========================\n`;
    orderDetails += `*Name:* ${userName || 'Valued Guest'}\n`;
    orderDetails += `*Type:* ${orderType.toUpperCase()}\n`;
    if (detailLabel) {
      orderDetails += `*Details:* ${detailLabel}\n`;
    }
    orderDetails += `==========================\n\n`;

    cart.forEach((item) => {
      orderDetails += `• ${item.quantity} × *${item.menuItem.name}* - ₹${item.menuItem.price * item.quantity}\n`;
    });

    orderDetails += `\n==========================\n`;
    orderDetails += `*Total Order Value:* ₹${subtotal}\n`;
    orderDetails += `==========================\n\n`;
    orderDetails += `Please confirm availability and preparation time. Thank you!`;

    const encodedMessage = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/919420032727?text=${encodedMessage}`, '_blank');
    
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      onClearCart();
      onClose();
    }, 2500);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-forest-950/80 backdrop-blur-sm transition-opacity duration-300"
    >
      {/* Backdrop closer */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Drawer content */}
      <div
        id="cart-drawer-content"
        className="relative w-full max-w-md h-full bg-forest-900 border-l border-gold-500/20 text-cream-100 shadow-2xl flex flex-col z-10"
      >
        {/* Header */}
        <div className="p-5 border-b border-forest-800 flex items-center justify-between bg-forest-950/40">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h2 className="text-xl font-serif font-medium tracking-wide text-cream-50">Your Order Summary</h2>
            <span className="bg-gold-500/20 text-gold-400 font-mono text-xs px-2.5 py-0.5 rounded-full border border-gold-500/20">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-forest-800 text-cream-300 hover:text-cream-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-forest-800 stroke-[1.5]" />
              <div>
                <p className="text-cream-300 font-serif text-lg">Your cart is empty</p>
                <p className="text-xs text-forest-500 mt-1">Browse our premium menu and add some savory wood-fired treats!</p>
              </div>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-forest-950/50 border border-forest-800/60"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 border-2 border-emerald-600 p-[1px] rounded-xs">
                          <span className="block w-full h-full bg-emerald-600 rounded-full"></span>
                        </span>
                        <h4 className="font-medium text-sm truncate text-cream-50">{item.menuItem.name}</h4>
                      </div>
                      <p className="text-xs text-gold-500 font-mono mt-1">
                        ₹{item.menuItem.price} <span className="text-forest-500">each</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-forest-950 rounded border border-forest-800">
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="p-1 text-cream-400 hover:text-cream-100 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-sm px-2 text-cream-100 min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="p-1 text-cream-400 hover:text-cream-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-mono text-sm text-gold-400 font-medium min-w-[3.5rem] text-right">
                        ₹{item.menuItem.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Customization Forms */}
              <div className="p-4 rounded-xl bg-forest-950/30 border border-gold-500/10 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-gold-400 font-semibold border-b border-forest-800 pb-2">
                  Order Setup
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-cream-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Sanjivani Student, Tejas"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-forest-950 border border-forest-800 rounded px-3 py-1.5 text-sm text-cream-100 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-forest-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-cream-300 mb-1">Dining Option</label>
                    <div className="grid grid-cols-3 gap-1 bg-forest-950 p-1 rounded border border-forest-800">
                      {(['dine-in', 'takeaway', 'train'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setOrderType(type);
                            if (type === 'dine-in') setDetailLabel('Table #');
                            else if (type === 'train') setDetailLabel('Train, Coach & Seat #');
                            else setDetailLabel('');
                          }}
                          className={`text-xs capitalize py-1 px-2 rounded transition-all duration-200 ${
                            orderType === type
                              ? 'bg-gold-500 text-forest-950 font-medium'
                              : 'text-cream-300 hover:bg-forest-900'
                          }`}
                        >
                          {type === 'dine-in' ? 'Dine In' : type === 'takeaway' ? 'Takeaway' : 'Train Delivery'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {orderType !== 'takeaway' && (
                    <div>
                      <label className="block text-xs font-medium text-cream-300 mb-1">
                        {orderType === 'dine-in' ? 'Table Number (Optional)' : 'Train details (PNR, Coach, Seat)'}
                      </label>
                      <input
                        type="text"
                        placeholder={orderType === 'dine-in' ? 'e.g., Table 5' : 'e.g., 12628, Coach B2, Seat 44'}
                        value={detailLabel}
                        onChange={(e) => setDetailLabel(e.target.value)}
                        className="w-full bg-forest-950 border border-forest-800 rounded px-3 py-1.5 text-sm text-cream-100 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-forest-600"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-forest-800 bg-forest-950/80 space-y-4">
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between text-xs text-cream-300">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-cream-400">
                <span>CGST & SGST (Inclusive)</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-cream-50 pt-1.5 border-t border-forest-800/40">
                <span className="font-serif">Estimated Total</span>
                <span className="text-gold-400">₹{subtotal}</span>
              </div>
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              disabled={orderSubmitted}
              className={`w-full py-3.5 rounded-lg font-serif font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                orderSubmitted
                  ? 'bg-emerald-600 text-cream-50'
                  : 'bg-gold-500 hover:bg-gold-400 text-forest-950 hover:scale-[1.02]'
              }`}
            >
              {orderSubmitted ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>Order Transferred to WhatsApp!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Order to Cafe WhatsApp</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-forest-500">
              Your order is sent directly to +91 94200 32727 on WhatsApp for confirmation and fresh wood-fired cooking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
