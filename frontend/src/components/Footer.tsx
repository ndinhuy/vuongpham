import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Expandable } from "@app/components";

type FooterProps = {};

const Footer: FC<FooterProps> = ({}: FooterProps) => {
  return (
    <footer className="w-full flex justify-center py-20 border-t mt-20 px-5">
      <div className="container flex flex-col xl:flex-row gap-10 lg:gap-20">
        <div className="">
          <div className="flex items-center gap-5">
            <Link className="max-w-[150px] max-h-[40px]" href="">
              <Image width={120} height={70} src="https://pubcdn.ivymoda.com/ivy2/images/logo-footer.png" alt="" />
            </Link>
            <Link className="max-w-[120px] max-h-[40px]" href="">
              <Image
                width={120}
                height={70}
                src="https://images.dmca.com/Badges/dmca_protected_16_120.png?ID=0cfdeac4-6e7f-4fca-941f-57a0a0962777"
                alt=""
              />
            </Link>
            <Link className="max-w-[120px] max-h-[40px]" href="">
              <Image width={120} height={70} src="https://pubcdn.ivymoda.com/ivy2/images/img-congthuong.png" alt="" />
            </Link>
          </div>

          <ul className="flex gap-5 mt-5">
            <li>
              <FontAwesomeIcon icon={faFacebook} size="xl" />
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </li>
            <li>
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </li>
          </ul>

          <button className="primary-button mt-5 px-6 py-3">
            <span className="font-bold">Hotline: 0855004714</span>
          </button>
        </div>

        <div className="hidden xl:flex flex-1 justify-between gap-5">
          <ul className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Giới thiệu</h3>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Về IVY moda</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Tuyển dụng</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Hệ thống cửa hàng</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Dịch vụ khách hàng</h3>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Chính sách điều khoản</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Hướng dẫn mua hàng</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Chính sách thanh toán</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Chính sách đổi trả</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Chính sách bảo hành</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Chính sách giao nhận vận chuyển</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Chính sách thẻ thành viên</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Hệ thống cửa hàng</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Q&A</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Liên hệ</h3>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Hotline</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">email</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Live chat</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Messenger</Link>
            </li>
            <li className="text-gray-500 hover:text-black">
              <Link href="">Liên hệ</Link>
            </li>
          </ul>
        </div>

        <div className="flex xl:hidden flex-col justify-between lg:gap-3">
          <Expandable title="Giới thiệu">
            <ul className="flex flex-col gap-3">
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Về IVY moda</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Tuyển dụng</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Hệ thống cửa hàng</Link>
              </li>
            </ul>
          </Expandable>

          <Expandable title="Dịch vụ khách hàng">
            <ul className="flex flex-col gap-3">
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Chính sách điều khoản</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Hướng dẫn mua hàng</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Chính sách thanh toán</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Chính sách đổi trả</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Chính sách bảo hành</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Chính sách giao nhận vận chuyển</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Chính sách thẻ thành viên</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Hệ thống cửa hàng</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Q&A</Link>
              </li>
            </ul>
          </Expandable>

          <Expandable title="Liên hệ">
            <ul className="flex flex-col gap-3">
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Hotline</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">email</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Live chat</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Messenger</Link>
              </li>
              <li className="text-gray-500 hover:text-black text-sm md:text-md">
                <Link href="">Liên hệ</Link>
              </li>
            </ul>
          </Expandable>
        </div>

        <div className="flex flex-col gap-5">
          <div className="p-5 lg:p-10 border-4 rounded-tl-[50px] rounded-br-[50px]">
            <h3 className="text-lg lg:text-2xl font-bold lg:max-w-[250px] text-ellipsis">
              Nhận thông tin các chương trình của IVY moda
            </h3>
            <form className="flex w-full gap-5 mt-3" method="post" action="">
              <input className="border-b p-2 px-0 flex-1 text-sm" type="text" placeholder="Nhập địa chỉ email" />
              <button className="secondary-button" type="submit">
                Đăng kí
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Download App</h3>
            <ul className="flex gap-5 mt-3">
              <li>
                <Link
                  id="app_ios"
                  href="http://ios.ivy.vn"
                  className="link-white max-w-[150px] max-h-[40px]"
                  title="Tải App IVYmoda trên App Store"
                >
                  <Image
                    width={150}
                    height={70}
                    className="object-cover"
                    src="https://pubcdn.ivymoda.com/ivy2/images/appstore.png"
                    alt=""
                  />
                </Link>
              </li>
              <li>
                <Link
                  id="app_android"
                  href="http://android.ivy.vn"
                  className="link-white max-w-[150px] max-h-[40px]"
                  target="_blank"
                  title="Tải App IVYmoda trên Google Play"
                >
                  <Image
                    width={150}
                    height={70}
                    className="object-cover"
                    src="https://pubcdn.ivymoda.com/ivy2/images/googleplay.png"
                    alt=""
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
