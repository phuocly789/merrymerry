
export const generateChristmasWish = (name: string, giftLink: string): string => {
  return `
    <div style="background-color: #020617; padding: 40px 10px; font-family: 'Segoe UI', Arial, sans-serif; text-align: center;">
      <!-- Main Container Table -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #0f172a; border-radius: 35px; border: 1px solid #1e293b; border-collapse: separate;">
        <tr>
          <td style="padding: 40px 30px; text-align: center;">
            
            <div style="font-size: 50px; margin-bottom: 20px;">🎄</div>
            
            <h1 style="color: #ef4444; font-size: 28px; margin: 0 0 10px 0; font-family: 'Georgia', serif; font-style: italic;">Giáng Sinh Diệu Kỳ</h1>
            <p style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 30px 0;">Gửi tặng: ${name}</p>
            
            <div style="height: 1px; background-color: #1e293b; margin-bottom: 30px;"></div>
            
            <div style="text-align: left; line-height: 1.8; color: #cbd5e1; font-size: 16px; font-style: italic; margin-bottom: 40px;">
              Chào ${name},<br><br>
              Giáng sinh này, mình muốn dành tặng bạn một bất ngờ nho nhỏ. Một không gian lung linh mình đã chuẩn bị riêng cho bạn...<br><br>
              Chúc bạn luôn giữ được sự ấm áp trong tim và nụ cười trên môi. Hãy nhấn vào nút bên dưới để mở món quà nhé!<br><br>
              <strong>Merry Christmas! 🤍</strong>
            </div>

            <!-- The Action Button -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
              <tr>
                <td align="center" style="background-color: #ef4444; border-radius: 18px; padding: 18px 40px;">
                  <a href="${giftLink}" target="_blank" style="color: #ffffff; text-decoration: none; font-size: 18px; font-family: Arial, sans-serif; font-weight: bold; display: block; width: 100%;">
                    🎁 MỞ QUÀ NGAY
                  </a>
                </td>
              </tr>
            </table>

            <div style="margin-top: 50px; border-top: 1px solid #1e293b; padding-top: 25px;">
              <p style="color: #ef4444; font-size: 20px; font-family: 'Georgia', serif; margin: 0;">From LMP With Love</p>
            </div>

          </td>
        </tr>
      </table>
      
      <p style="color: #475569; font-size: 10px; margin-top: 30px;">
        © 2024 LMP Christmas Magic
      </p>
    </div>
  `;
};
