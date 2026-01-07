<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OTPMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $otp;

    // Pass the user modal to the mailable

    public function __construct($otp)
    {
        $this->otp = $otp;
    }

   
    public function build(){
        return $this->subject('Your OTP Code')
                    ->view('emails.otp')
                    ->with(['otp' => $this->otp]);
    }
}
