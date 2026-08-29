const cfg = window.RAF_CONFIG;
const productsEl = document.querySelector('#shop');
const cartDrawer = document.querySelector('#cartDrawer');
const overlay = document.querySelector('#overlay');
const cartCount = document.querySelector('#cartCount');
const cartItems = document.querySelector('#cartItems');
const cartSubtotal = document.querySelector('#cartSubtotal');
const checkoutSubtotal = document.querySelector('#checkoutSubtotal');
const checkoutWeight = document.querySelector('#checkoutWeight');
const checkoutShipping = document.querySelector('#checkoutShipping');
const checkoutGrandTotal = document.querySelector('#checkoutGrandTotal');
const checkoutDialog = document.querySelector('#checkoutDialog');
const toast = document.querySelector('#toast');

let cart = JSON.parse(localStorage.getItem('rafCart') || '{}');

const money = n => new Intl.NumberFormat('en-MY', {style:'currency',currency:'MYR'}).format(n);

function renderProducts(){
  const positions = ['13% 17%','40% 16%','66% 16%','91% 16%'];
  productsEl.innerHTML = cfg.products.map((p,i)=>`
    <article class="product-card">
      <div class="product-image">
        <img src="assets/raf-products.png" alt="${p.name}" style="object-position:${positions[i]||'center'}">
        <span class="product-tag">${p.tag}</span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p><strong>${p.short}</strong><br>${p.description}</p>
        <div class="product-meta"><strong>${money(p.price)}</strong><span>${p.weight}</span></div>
        <div class="qty-row">
          <div class="qty">
            <button type="button" onclick="stepQty('${p.id}',-1)">−</button>
            <input id="qty-${p.id}" type="number" min="1" value="1">
            <button type="button" onclick="stepQty('${p.id}',1)">+</button>
          </div>
          <button class="add-btn" onclick="addFromCard('${p.id}')">Add to Cart</button>
        </div>
      </div>
    </article>`).join('');
}
window.stepQty=(id,delta)=>{
  const input=document.querySelector(`#qty-${id}`);
  input.value=Math.max(1,Number(input.value||1)+delta);
};
window.addFromCard=id=>{
  const input=document.querySelector(`#qty-${id}`);
  addToCart(id,Math.max(1,Number(input.value||1)));
  input.value=1;
};
function addToCart(id,qty=1){
  cart[id]=(cart[id]||0)+qty; saveCart(); showToast('Ditambah ke cart ✓');
}
window.changeCart=(id,delta)=>{
  cart[id]=(cart[id]||0)+delta;
  if(cart[id]<=0) delete cart[id];
  saveCart();
};
window.removeItem=id=>{delete cart[id]; saveCart();};
function saveCart(){
  localStorage.setItem('rafCart',JSON.stringify(cart)); renderCart();
}
function cartRows(){
  return Object.entries(cart).map(([id,qty])=>{
    const p=cfg.products.find(x=>x.id===id);
    return p?{p,qty,total:p.price*qty,weightGram:p.weightGram*qty}:null;
  }).filter(Boolean);
}
function totals(){
  const rows=cartRows();
  const subtotal=rows.reduce((s,x)=>s+x.total,0);
  const totalGram=rows.reduce((s,x)=>s+x.weightGram,0);
  const actualKg=totalGram/1000;
  const billableKg=rows.length?Math.max(cfg.minBillableKg,Math.ceil(actualKg)):0;
  const shipping=billableKg*cfg.shippingRatePerKg;
  return {rows,subtotal,totalGram,actualKg,billableKg,shipping,grandTotal:subtotal+shipping};
}
function renderCart(){
  const t=totals();
  cartCount.textContent=t.rows.reduce((s,x)=>s+x.qty,0);
  cartSubtotal.textContent=money(t.subtotal);
  checkoutSubtotal.textContent=money(t.subtotal);
  if(checkoutWeight) checkoutWeight.textContent=`${t.actualKg.toFixed(2)} kg (billable ${t.billableKg} kg)`;
  if(checkoutShipping) checkoutShipping.textContent=money(t.shipping);
  if(checkoutGrandTotal) checkoutGrandTotal.textContent=money(t.grandTotal);
  if(!t.rows.length){
    cartItems.innerHTML=`<div class="empty-cart">Cart masih kosong.<br><small>Pilih sambal RAF kegemaran anda 🌶️</small></div>`;
    return;
  }
  cartItems.innerHTML=t.rows.map(({p,qty,total})=>`
    <div class="cart-item">
      <img class="cart-thumb" src="assets/raf-products.png" alt="${p.name}">
      <div>
        <h4>${p.name}</h4><p>${p.weight} • ${money(p.price)}</p>
        <div class="cart-item-actions">
          <button onclick="changeCart('${p.id}',-1)">−</button><strong>${qty}</strong>
          <button onclick="changeCart('${p.id}',1)">+</button>
          <button class="remove" onclick="removeItem('${p.id}')">Remove</button>
        </div>
      </div>
      <strong>${money(total)}</strong>
    </div>`).join('');
}
function openCart(){cartDrawer.classList.add('open');overlay.classList.add('open');}
function closeCart(){cartDrawer.classList.remove('open');overlay.classList.remove('open');}
document.querySelector('#openCart').addEventListener('click',openCart);
document.querySelector('#closeCart').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);

document.querySelector('#addBundle').addEventListener('click',()=>{
  cfg.products.forEach(p=>cart[p.id]=(cart[p.id]||0)+1);
  saveCart();showToast('RAF Taster Set ditambah ✓');openCart();
});
document.querySelector('#goCheckout').addEventListener('click',()=>{
  if(!cartRows().length) return showToast('Cart masih kosong');
  closeCart();checkoutDialog.showModal();
});
function showToast(message){
  toast.textContent=message;toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
}
function validateCheckout(){
  const ids=['customerName','customerPhone','customerAddress','customerPostcode','customerState'];
  let ok=true;
  ids.forEach(id=>{
    const el=document.querySelector('#'+id);
    if(!el.value.trim()){el.style.borderColor='#b8322b';ok=false;} else el.style.borderColor='';
  });
  if(!ok) showToast('Lengkapkan maklumat penghantaran');
  return ok;
}
function makeOrderId(){
  const d=new Date();
  const stamp=d.toISOString().replace(/\D/g,'').slice(2,12);
  const rnd=Math.random().toString(36).slice(2,6).toUpperCase();
  return `RAF-${stamp}-${rnd}`;
}
function orderPayload(){
  const t=totals();
  return {
    action:'create_order',
    orderId:makeOrderId(),
    createdAt:new Date().toISOString(),
    customer:{
      name:document.querySelector('#customerName').value.trim(),
      phone:document.querySelector('#customerPhone').value.trim(),
      email:document.querySelector('#customerEmail').value.trim(),
      address:document.querySelector('#customerAddress').value.trim(),
      postcode:document.querySelector('#customerPostcode').value.trim(),
      state:document.querySelector('#customerState').value.trim()
    },
    items:t.rows.map(x=>({
      id:x.p.id,name:x.p.name,weight:x.p.weight,unitPrice:x.p.price,qty:x.qty,lineTotal:x.total
    })),
    subtotal:t.subtotal,
    actualWeightKg:Number(t.actualKg.toFixed(3)),
    billableWeightKg:t.billableKg,
    shipping:t.shipping,
    grandTotal:t.grandTotal,
    paymentMethod:'BANK TRANSFER',
    paymentStatus:'UNPAID',
    deliveryStatus:'NEW ORDER',
    note:document.querySelector('#customerNote').value.trim()
  };
}
async function saveOrder(payload){
  if(!cfg.orderApiUrl || cfg.orderApiUrl.includes('PASTE_GOOGLE')){
    localStorage.setItem(`rafOrder-${payload.orderId}`,JSON.stringify(payload));
    return {ok:true,mode:'local-demo',orderId:payload.orderId};
  }
  const res=await fetch(cfg.orderApiUrl,{
    method:'POST',
    headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify(payload)
  });
  if(!res.ok) throw new Error('Order API failed');
  return await res.json();
}
function buildOrderText(o){
  const itemText=o.items.map((x,i)=>`${i+1}. ${x.name} (${x.weight}) x${x.qty} = ${money(x.lineTotal)}`).join('\n');
  return `RAF PREMIUM FOODS - NEW ORDER
Order ID: ${o.orderId}

Nama: ${o.customer.name}
Telefon: ${o.customer.phone}
Email: ${o.customer.email||'-'}
Alamat: ${o.customer.address}, ${o.customer.postcode}, ${o.customer.state}

ORDER:
${itemText}

Subtotal: ${money(o.subtotal)}
Shipping (${o.billableWeightKg}kg): ${money(o.shipping)}
JUMLAH: ${money(o.grandTotal)}

Payment: Online Bank Transfer
Reference: ${o.orderId}

${o.note?`Nota: ${o.note}\n`:''}
Saya ingin sahkan order ini.`;
}
function saveLastOrder(o){
  localStorage.setItem('rafLastOrderId',o.orderId);
  localStorage.setItem('rafLastOrderPhone',o.customer.phone);
  localStorage.setItem('rafLastOrder',JSON.stringify(o));
}

document.querySelector('#placeOrder').addEventListener('click',async()=>{
  if(!validateCheckout()) return;
  const btn=document.querySelector('#placeOrder');
  btn.disabled=true; btn.textContent='Menyimpan order...';
  try{
    const o=orderPayload();
    await saveOrder(o);
    saveLastOrder(o);
    window.location.href=`payment.html?orderId=${encodeURIComponent(o.orderId)}&phone=${encodeURIComponent(o.customer.phone)}`;
  }catch(e){
    console.error(e);showToast('Order belum berjaya disimpan');
  }finally{
    btn.disabled=false;btn.textContent='Buat Pesanan & Lihat Bank Details';
  }
});

document.querySelector('#orderWhatsapp').addEventListener('click',async()=>{
  if(!validateCheckout()) return;
  const btn=document.querySelector('#orderWhatsapp');
  btn.disabled=true; btn.textContent='Menyimpan order...';
  try{
    const o=orderPayload();
    await saveOrder(o);
    saveLastOrder(o);
    const text=encodeURIComponent(buildOrderText(o));
    window.open(`https://wa.me/${cfg.whatsappNumber}?text=${text}`,'_blank','noopener');
    showToast(`Order ${o.orderId} disimpan ✓`);
  }catch(e){
    console.error(e);showToast('Order belum berjaya disimpan');
  }finally{
    btn.disabled=false;btn.textContent='Order via WhatsApp';
  }
});
document.querySelector('#footerWhatsapp').addEventListener('click',(e)=>{
  e.preventDefault();window.open(`https://wa.me/${cfg.whatsappNumber}`,'_blank','noopener');
});
document.querySelector('#year').textContent=new Date().getFullYear();
renderProducts();renderCart();
