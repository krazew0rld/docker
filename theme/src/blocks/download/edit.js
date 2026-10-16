import { __ } from '@wordpress/i18n';
import { MediaUpload, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
	Button, 
	ButtonGroup,
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
 } from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import './editor.css';

export default function Edit({ attributes, setAttributes, isSelected }) {

	const { file, align, style, color } = attributes;

	const cls = [
		'mo-download',
		align !== 'left' ? `mo-download--${align}` : null,
		style !== 'default' ? `mo-download--${style}` : null,
		color !== 'primary' ? `mo-download--${color}` : null
	]

	const blockProps = useBlockProps()

	console.log(file)

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Réglages du bouton', 'cd50')} >
					<ToggleGroupControl
						label={__('Couleur', 'cd50')}
						value={color}
						onChange={(value) => setAttributes({ color: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="primary" label={__('Primaire', 'cd50')} />
						<ToggleGroupControlOption value="secondary" label={__('Secondaire', 'cd50')} />
					</ToggleGroupControl>
					<ToggleGroupControl
						label={__('Style', 'cd50')}
						value={style}
						onChange={(value) => setAttributes({ style: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="fill" label={__('Plein', 'cd50')} />
						<ToggleGroupControlOption value="outline" label={__('Détouré', 'cd50')} />
					</ToggleGroupControl>
					<ToggleGroupControl
						label={__('Alignement', 'cd50')}
						value={align}
						onChange={(value) => setAttributes({ align: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOptionIcon value="left" label={__('Gauche', 'cd50')} icon={alignLeft} />
						<ToggleGroupControlOptionIcon value="center" label={__('Centre', 'cd50')} icon={alignCenter} />
						<ToggleGroupControlOptionIcon value="right" label={__('Droite', 'cd50')} icon={alignRight} />
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<a href={file?.url} target="_blank" rel="noopener noreferrer" className={cls.filter(Boolean).join(' ')}>
					<div className="mo-download__container">
						<span className="mo-download__icon">
							<i className="fa-solid fa-file-arrow-down fa-xl"></i>
						</span>
						<span className="mo-download__title">
							{file ? file?.title : __('Aucun fichier', 'cd50')}
						</span>
					</div>
					<div className="mo-download__info">
						<span className="mo-download__size">{file?.filesizeHumanReadable}</span>
						<span className="mo-download__type">{file?.filename.split('.').pop().toUpperCase()}</span>
					</div>
				</a>
				{(isSelected || !file) && (
					<MediaUpload
						onSelect={(value) => setAttributes({ file: value })}
						value={file}
						allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']}
						render={({ open }) => (
							file ? (
								<ButtonGroup style={{ display: 'flex', gap: '10px', marginTop: 'var(--sp-2)' }}>
									<Button variant="secondary" onClick={open}>
										{__('Modifier le fichier', 'cd50')}
									</Button>
									<Button variant="secondary" isDestructive onClick={() => setAttributes({ file: null })}>
										{__('Supprimer le fichier', 'cd50')}
									</Button>
								</ButtonGroup>
							) : (
								<Button variant="secondary" onClick={open} style={{ marginTop: 'var(--sp-2)' }}>
									{__('Ajouter un fichier', 'cd50')}
								</Button>
							)
						)}
					/>
				)}
			</div>
		</>
	);
}
