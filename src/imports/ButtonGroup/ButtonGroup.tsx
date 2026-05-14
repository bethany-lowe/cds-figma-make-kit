import svgPaths from "./svg-o79mglxn9d";

function ButtonText() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_button-text">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[15px] text-center text-white tracking-[-0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Primary action</p>
      </div>
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <ButtonText />
    </div>
  );
}

function ButtonText1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_button-text">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#4b286d] text-[15px] text-center tracking-[-0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Secondary action</p>
      </div>
    </div>
  );
}

function ButtonContent1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <ButtonText1 />
    </div>
  );
}

function ButtonText2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_button-text">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[15px] text-center text-white tracking-[-0.09px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Primary action</p>
      </div>
    </div>
  );
}

function ButtonContent2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <ButtonText2 />
    </div>
  );
}

function Right() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-[152px]" data-name="Right">
      <div className="content-stretch flex h-[56px] items-center justify-end min-h-[56px] min-w-[88px] relative shrink-0 w-full" data-name="✅ Button [READY]">
        <div className="flex flex-row items-center self-stretch">
          <div className="bg-[#4b286d] h-full relative rounded-[999px] shrink-0" data-name="button_prop">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative size-full">
                <ButtonContent2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonText3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_button-text">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#4b286d] text-[15px] text-center tracking-[-0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Secondary action</p>
      </div>
    </div>
  );
}

function ButtonContent3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <ButtonText3 />
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[166px]" data-name="Left">
      <div className="content-stretch flex h-[56px] items-start min-h-[56px] min-w-[88px] relative shrink-0 w-full" data-name="✅ Button [READY]">
        <div className="cursor-pointer relative rounded-[999px] self-stretch shrink-0" data-name=".button_prop">
          <div aria-hidden="true" className="absolute border-2 border-[#361a4f] border-solid inset-0 pointer-events-none rounded-[999px]" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative size-full">
              <ButtonContent3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonContent4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="abstractPlaceholderLine">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper">
          <div className="relative shrink-0 size-[24px]" data-name="_icon-art">
            <div className="absolute inset-0" data-name="_placeholder-line">
              <div className="absolute inset-1/4" data-name="fill">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <path clipRule="evenodd" d={svgPaths.p37ed0e80} fill="var(--fill-0, white)" fillRule="evenodd" id="fill" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonGroupItem() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center px-[24px] py-[12px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Button Group Item 1">
      <div className="content-stretch flex items-center justify-center min-h-[48px] min-w-[48px] relative shrink-0" data-name="✅ Button [READY]">
        <div className="bg-[#4b286d] content-stretch cursor-pointer flex items-center justify-center p-[12px] relative rounded-[999px] shrink-0 w-[48px]" data-name=".button_prop">
          <ButtonContent4 />
        </div>
      </div>
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#414547] text-[11px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">Label</p>
      </div>
    </div>
  );
}

function ButtonContent5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="abstractPlaceholderLine">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper">
          <div className="relative shrink-0 size-[24px]" data-name="_icon-art">
            <div className="absolute inset-0" data-name="_placeholder-line">
              <div className="absolute inset-1/4" data-name="fill">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <path clipRule="evenodd" d={svgPaths.p37ed0e80} fill="var(--fill-0, white)" fillRule="evenodd" id="fill" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonGroupItem1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center px-[24px] py-[12px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Button Group Item 2">
      <div className="content-stretch flex items-center justify-center min-h-[48px] min-w-[48px] relative shrink-0" data-name="✅ Button [READY]">
        <div className="bg-[#4b286d] content-stretch cursor-pointer flex items-center justify-center p-[12px] relative rounded-[999px] shrink-0 w-[48px]" data-name=".button_prop">
          <ButtonContent5 />
        </div>
      </div>
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#414547] text-[11px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">Label</p>
      </div>
    </div>
  );
}

function ButtonContent6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="abstractPlaceholderLine">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper">
          <div className="relative shrink-0 size-[24px]" data-name="_icon-art">
            <div className="absolute inset-0" data-name="_placeholder-line">
              <div className="absolute inset-1/4" data-name="fill">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <path clipRule="evenodd" d={svgPaths.p37ed0e80} fill="var(--fill-0, white)" fillRule="evenodd" id="fill" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonGroupItem2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center px-[24px] py-[12px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Button Group Item 3">
      <div className="content-stretch flex items-center justify-center min-h-[48px] min-w-[48px] relative shrink-0" data-name="✅ Button [READY]">
        <div className="bg-[#4b286d] content-stretch cursor-pointer flex items-center justify-center p-[12px] relative rounded-[999px] shrink-0 w-[48px]" data-name=".button_prop">
          <ButtonContent6 />
        </div>
      </div>
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#414547] text-[11px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">Label</p>
      </div>
    </div>
  );
}

function ButtonContent7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="abstractPlaceholderLine">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper">
          <div className="relative shrink-0 size-[24px]" data-name="_icon-art">
            <div className="absolute inset-0" data-name="_placeholder-line">
              <div className="absolute inset-1/4" data-name="fill">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <path clipRule="evenodd" d={svgPaths.p37ed0e80} fill="var(--fill-0, white)" fillRule="evenodd" id="fill" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonGroupItem3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center px-[24px] py-[12px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Button Group Item 1">
      <div className="content-stretch flex items-center justify-center min-h-[48px] min-w-[48px] relative shrink-0" data-name="✅ Button [READY]">
        <div className="bg-[#4b286d] content-stretch cursor-pointer flex items-center justify-center p-[12px] relative rounded-[999px] shrink-0 w-[48px]" data-name=".button_prop">
          <ButtonContent7 />
        </div>
      </div>
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#414547] text-[11px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">Label</p>
      </div>
    </div>
  );
}

function ButtonContent8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_button_content">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="abstractPlaceholderLine">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper">
          <div className="relative shrink-0 size-[24px]" data-name="_icon-art">
            <div className="absolute inset-0" data-name="_placeholder-line">
              <div className="absolute inset-1/4" data-name="fill">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <path clipRule="evenodd" d={svgPaths.p37ed0e80} fill="var(--fill-0, white)" fillRule="evenodd" id="fill" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonGroupItem4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center px-[24px] py-[12px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Button Group Item 2">
      <div className="content-stretch flex items-center justify-center min-h-[48px] min-w-[48px] relative shrink-0" data-name="✅ Button [READY]">
        <div className="bg-[#4b286d] content-stretch cursor-pointer flex items-center justify-center p-[12px] relative rounded-[999px] shrink-0 w-[48px]" data-name=".button_prop">
          <ButtonContent8 />
        </div>
      </div>
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#414547] text-[11px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">Label</p>
      </div>
    </div>
  );
}

export default function ButtonGroup() {
  return (
    <div className="bg-white relative size-full" data-name="Button Group">
      <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[162px] top-[68px]" data-name="✅ Button Group Standard Stacked [BETA]">
        <div className="content-stretch flex h-[56px] items-start justify-between min-h-[56px] min-w-[88px] relative shrink-0 w-[152px]" data-name="✅ Button [READY]">
          <div className="bg-[#4b286d] cursor-pointer min-w-[88px] relative rounded-[999px] self-stretch shrink-0" data-name=".button_prop">
            <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[24px] py-[12px] relative size-full">
                <ButtonContent />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex h-[56px] items-start justify-between min-h-[56px] min-w-[88px] relative shrink-0 w-[174px]" data-name="✅ Button [READY]">
          <div className="cursor-pointer relative rounded-[999px] self-stretch shrink-0" data-name=".button_prop">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative size-full">
                <ButtonContent1 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[24px] items-center left-[176px] top-[235px]" data-name="✅ Button Group Standard Horizontal [BETA]">
        <Right />
        <Left />
      </div>
      <div className="absolute content-stretch flex gap-[4px] items-center justify-center left-[173px] top-[358px] w-[342px]" data-name="✅ Button Group Icon Buttons [BETA]">
        <div className="flex-[1_0_0] h-[100px] min-w-px" data-name="spacer" />
        <ButtonGroupItem />
        <div className="flex-[1_0_0] h-[100px] min-w-px" data-name="spacer" />
        <ButtonGroupItem1 />
        <div className="flex-[1_0_0] h-[100px] min-w-px" data-name="spacer" />
        <ButtonGroupItem2 />
        <div className="flex-[1_0_0] h-[100px] min-w-px" data-name="spacer" />
      </div>
      <div className="absolute content-stretch flex gap-[4px] items-center justify-center left-[137px] top-[468px] w-[342px]" data-name="✅ Button Group Icon Buttons [BETA]">
        <div className="flex-[1_0_0] h-[100px] min-w-px" data-name="spacer" />
        <ButtonGroupItem3 />
        <div className="drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex-[1_0_0] h-[100px] min-w-px" data-name="spacer" />
        <ButtonGroupItem4 />
        <div className="flex-[1_0_0] h-[100px] min-w-px" data-name="spacer" />
      </div>
    </div>
  );
}