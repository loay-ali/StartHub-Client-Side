'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiShield, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { ButtonLoader } from '@/components/preloader/ButtonLoader';
import config from '@/constants/config';
import { notificationService } from '@/lib/notifiationSystem';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import AIHelperButton from '@/components/ai/AIHelperButton';

const ROLES = ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'] as const;
type Role = typeof ROLES[number];

const ROLE_LABELS: Record<Role, string> = {
    ADMIN: 'Admin',
    HR: 'Human Resources',
    MANAGER: 'Manager',
    EMPLOYEE: 'Employee',
};

const ROLE_COLORS: Record<Role, string> = {
    ADMIN: 'bg-red-50 text-red-700 border-red-200',
    HR: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    MANAGER: 'bg-amber-50 text-amber-700 border-amber-200',
    EMPLOYEE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function Field({
    id, label, icon, error, aiPurpose, aiValue, children,
}: {
    id: string; label: string; icon?: React.ReactNode; error?: string;
    aiPurpose?: string; aiValue?: unknown; children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5 relative">
            <label htmlFor={id} className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                {icon && <span className="text-text-secondary">{icon}</span>}
                {label}
            </label>
            {children}
            {aiPurpose && (
                <AIHelperButton purpose={aiPurpose} message={{
                    content: `What do you need for the ${label} field?`,
                    actions: [],
                    //@ts-ignore
                    additional: { [id]: aiValue }
                }} />
            )}
            {error && (
                <p className="text-xs text-danger font-medium mt-0.5">{error}</p>
            )}
        </div>
    );
}

function inputClass(hasError?: boolean) {
    return `w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition duration-200
        ${hasError
            ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/10 bg-red-50/30'
            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/10 bg-surface'
        }`;
}

export default function EditUserPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'EMPLOYEE' as Role,
        isActive: true,
    });

    const [errors, setErrors] = useState<Partial<typeof form & { general: string }>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch existing user data
        fetch(config.apiUrl + '/user/' + params.id, { credentials: 'include' })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('User not found');
            })
            .then(data => {
                setForm({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    password: '',
                    confirmPassword: '',
                    role: data.role || 'EMPLOYEE',
                    isActive: data.isActive ?? true,
                });
            })
            .catch(() => {
                notificationService.error('Error', 'Failed to load user data');
                router.push('/dashboard/users/all');
            })
            .finally(() => setLoading(false));
    }, [params.id, router]);

    const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined, general: undefined }));
    };

    function validate(): boolean {
        const e: typeof errors = {};
        if (!form.firstName.trim()) e.firstName = 'First name is required.';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email is required.';
        
        if (form.password) {
            if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
            if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
        }
        
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        setIsSubmitting(true);

        const payload: any = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim() || undefined,
            email: form.email.trim(),
            role: form.role,
            isActive: form.isActive,
        };
        
        if (form.password) {
            payload.password = form.password;
        }

        // Using POST request as requested
        fetch(config.apiUrl + '/user/' + params.id, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    setSuccess(true);
                    notificationService.success('User Updated', `${form.firstName} has been updated successfully.`);
                    setTimeout(() => router.push('/dashboard/users/all'), 1200);
                } else {
                    return res.json().then(data => {
                        setErrors({ general: data?.message ?? 'Failed to update user. Please try again.' });
                    });
                }
            })
            .catch(() => setErrors({ general: 'A network error occurred. Please try again.' }))
            .finally(() => setIsSubmitting(false));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <ButtonLoader size={30} color="currentColor" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <button
                    type="button"
                    onClick={() => router.push('/dashboard/users/all')}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition mb-4"
                >
                    <FiArrowLeft size={14} /> Back to Users
                </button>
                <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Edit User</h1>
                <p className="text-sm text-text-secondary mt-1">
                    Update details and access for {form.firstName} {form.lastName}.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
            >
                {/* General Error */}
                {errors.general && (
                    <div className="flex items-center gap-3 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger font-medium">
                        {errors.general}
                    </div>
                )}

                {/* Success Banner */}
                {success && (
                    <div className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success font-medium">
                        <FiCheckCircle size={16} />
                        User updated successfully! Redirecting…
                    </div>
                )}

                {/* Card: Personal Info */}
                <section className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-5">
                    <h2 className="font-bold text-text-primary text-sm uppercase tracking-wider">Personal Information</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field id="firstName" label="First Name" icon={<FiUser size={14} />} error={errors.firstName} aiPurpose="userFirstName" aiValue={form.firstName}>
                            <input
                                id="firstName"
                                type="text"
                                required
                                placeholder="e.g. John"
                                value={form.firstName}
                                onChange={set('firstName')}
                                className={inputClass(!!errors.firstName) + ' pr-10'}
                            />
                        </Field>

                        <Field id="lastName" label="Last Name (optional)" icon={<FiUser size={14} />} aiPurpose="userLastName" aiValue={form.lastName}>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="e.g. Doe"
                                value={form.lastName}
                                onChange={set('lastName')}
                                className={inputClass() + ' pr-10'}
                            />
                        </Field>
                    </div>

                    <Field id="email" label="Email Address" icon={<FiMail size={14} />} error={errors.email} aiPurpose="userEmail" aiValue={form.email}>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="john.doe@company.com"
                            value={form.email}
                            onChange={set('email')}
                            className={inputClass(!!errors.email) + ' pr-10'}
                        />
                    </Field>
                </section>

                {/* Card: Access & Role */}
                <section className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-5">
                    <h2 className="font-bold text-text-primary text-sm uppercase tracking-wider">Access & Role</h2>

                    <Field id="role" label="Role" icon={<FiShield size={14} />} aiPurpose="userRole" aiValue={form.role}>
                        <select
                            id="role"
                            value={form.role}
                            onChange={set('role')}
                            className={inputClass() + ' pr-10'}
                        >
                            {ROLES.map(r => (
                                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                            ))}
                        </select>
                        {/* Role badge preview */}
                        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${ROLE_COLORS[form.role]}`}>
                            <FiShield size={11} /> {ROLE_LABELS[form.role]}
                        </span>
                    </Field>

                    {/* Active toggle */}
                    <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                        <div>
                            <p className="text-sm font-semibold text-text-primary">Active Account</p>
                            <p className="text-xs text-text-secondary mt-0.5">Allow this user to log in.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, isActive: !prev.isActive }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none
                                ${form.isActive ? 'bg-primary' : 'bg-border'}`}
                            role="switch"
                            aria-checked={form.isActive}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
                                ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </section>

                {/* Card: Security */}
                <section className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-5">
                    <h2 className="font-bold text-text-primary text-sm uppercase tracking-wider">Security</h2>
                    <p className="text-xs text-text-secondary">Leave password fields blank if you do not want to change the password.</p>

                    <Field id="password" label="New Password" icon={<FiLock size={14} />} error={errors.password}>
                        <input
                            id="password"
                            type="password"
                            placeholder="Min. 8 characters (optional)"
                            value={form.password}
                            onChange={set('password')}
                            className={inputClass(!!errors.password)}
                        />
                    </Field>

                    <Field id="confirmPassword" label="Confirm New Password" icon={<FiLock size={14} />} error={errors.confirmPassword}>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Repeat new password"
                            value={form.confirmPassword}
                            onChange={set('confirmPassword')}
                            className={inputClass(!!errors.confirmPassword)}
                        />
                        {/* Match indicator */}
                        {form.password && form.confirmPassword && (
                            <span className={`text-xs font-medium ${form.password === form.confirmPassword ? 'text-success' : 'text-danger'}`}>
                                {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </span>
                        )}
                    </Field>
                </section>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard/users/all')}
                        className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary hover:bg-surface-hover transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || success}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition
                            ${isSubmitting || success ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                    >
                        {isSubmitting && <ButtonLoader size={16} color="white" />}
                        {isSubmitting ? 'Saving…' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}