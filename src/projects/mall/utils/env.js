
const u = navigator.userAgent
export const isAndroidEnv = u.indexOf('Android') !== -1 || u.indexOf('Adr') !== -1;
export const isIOSEnv = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export const isIPadEnv = !!u.match(/\(iPad;( U;)? CPU.+Mac OS X/);
export const isIPhoneEnv = !!u.match(/\(iPhone;( U;)? CPU.+Mac OS X/);
export const isWeChatEnv = u.indexOf('MicroMessenger') !== -1

export default {
  isAndroidEnv,
  isIOSEnv,
  isIPadEnv,
  isIPhoneEnv,
  isWeChatEnv
}